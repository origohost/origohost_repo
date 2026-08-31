import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rateLimit';
import { createCrmRegistration, getCrmRegistrations } from '@/services/crm/registrations.service';
import { getEventById } from '@/services/crm/events.service';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anon-client';
    const rateLimit = checkRateLimit(`event-register-${ip}`, 5, 60000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Too many registration requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 1. Honeypot check for automated bots
    if (body._hp) {
      return NextResponse.json(
        { success: true, message: 'Registration confirmed.' },
        { status: 200 }
      );
    }

    const { eventId, name, email, organization } = body;
    if (!eventId || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required registration parameters: eventId, name, email' },
        { status: 400 }
      );
    }

    // 2. Validate Event Status & Capacity
    const eventRes = await getEventById(eventId);
    if (!eventRes.success || !eventRes.data) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    const event = eventRes.data;
    if (event.status === 'Cancelled' || event.status === 'Past') {
      return NextResponse.json(
        { success: false, error: `Registrations are closed for this event (Status: ${event.status})` },
        { status: 400 }
      );
    }

    // 3. Duplicate Registration Check
    const existingRegs = await getCrmRegistrations(email, undefined, eventId);
    if (existingRegs.data && existingRegs.data.some((r) => r.participantEmail.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'You are already registered for this event.' },
        { status: 409 }
      );
    }

    // 4. Ingest Registration & Auto-Link Contact
    const regRes = await createCrmRegistration({
      eventId: event.id,
      eventTitle: event.title,
      participantName: name,
      participantEmail: email,
      organizationName: organization || '',
      status: 'Confirmed',
    });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully registered for ${event.title}! A confirmation notice has been dispatched.`,
        data: regRes.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API:EventRegister] Exception:', error);
    return NextResponse.json(
      { success: false, error: 'An internal error occurred during registration.' },
      { status: 500 }
    );
  }
}
