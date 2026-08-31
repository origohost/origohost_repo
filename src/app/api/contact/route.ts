import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation/contact.schema';
import { createLead } from '@/services/crm/leads.service';
import { createCrmTask } from '@/services/crm/tasks.service';

import { checkRateLimit } from '@/lib/security/rateLimit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anon-client';
    const rateLimit = checkRateLimit(`contact-${ip}`, 5, 60000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const rawBody = await request.json();


    // 1. Honeypot check for spam bots
    if (rawBody._hp) {
      return NextResponse.json(
        { success: true, message: 'Inquiry received.' },
        { status: 200 }
      );
    }

    // 2. Validate with Zod schema
    const parseResult = contactFormSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed.',
          details: errorMessages,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 3. Ingest into CRM Inbound Leads
    const names = (data.name || 'Inbound Prospect').split(' ');
    const firstName = names[0] || 'Prospect';
    const lastName = names.slice(1).join(' ') || '';

    const leadRes = await createLead({
      title: `Inquiry: ${data.category || 'General'} (${data.name})`,
      firstName,
      lastName,
      email: data.email,
      phone: data.contact_number,
      company: data.organization,
      source: `Website Contact (${data.category || 'Inquiry'})`,
      status: 'NEW',
      priority: 'High',
      notes: data.message,
    });


    if (leadRes.success && leadRes.data) {
      await createCrmTask({
        title: `Follow-up Inquiry: ${data.name}`,
        description: `Contact inquiry received regarding ${data.category}. Message: "${data.message}"`,
        assignee: 'usr-operator-01',
        assignedToName: 'CRM Inbound Operator',
        priority: 'High',
        status: 'To Do',
        dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[API:Contact] Valid submission ingested into CRM for:', data.email);
    }


    // Return standardized success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. Our team will contact you within 1-2 business days.',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('[API:Contact] Processing exception:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your request.',
      },
      { status: 500 }
    );
  }
}
