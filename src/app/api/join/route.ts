import { NextResponse } from 'next/server';
import { joinFormSchema } from '@/lib/validation/join.schema';
import { createApplication } from '@/services/crm/applications.service';
import { createCrmTask } from '@/services/crm/tasks.service';


export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // 1. Honeypot check for automated bots
    if (rawBody._hp) {
      return NextResponse.json(
        { success: true, message: 'Application received.' },
        { status: 200 }
      );
    }

    // 2. Validate with Zod schema
    const parseResult = joinFormSchema.safeParse(rawBody);
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

    // 3. Ingest into CRM Application Intake & create follow-up task
    const appPathwayMap: Record<string, any> = {
      builder: 'ECOSYSTEM_DEVELOPER',
      creator: 'COMMUNITY_MEMBER',
      node_operator: 'INFRASTRUCTURE_PARTNER',
      partner: 'INFRASTRUCTURE_PARTNER',
      sponsor: 'SPONSORSHIP',
      incubator: 'VENTURE_STUDIO',
    };

    const crmAppRes = await createApplication({
      applicantName: data.name,
      email: data.email,
      organizationName: data.organization,
      pathway: appPathwayMap[data.pathway] || 'COMMUNITY_MEMBER',
      notes: data.motivation || 'Submitted via Public Join Form.',
      status: 'PENDING',
      tags: ['Inbound-Website', data.pathway || 'Join'],
    });


    if (crmAppRes.success && crmAppRes.data) {
      // Auto-create operator review task
      await createCrmTask({
        title: `Review Application: ${data.name} (${crmAppRes.data.pathway})`,
        description: `New inbound join submission from ${data.email}. Evaluate profile and decision.`,
        assignee: 'usr-operator-01',
        assignedToName: 'CRM Operator Team',
        priority: 'High',
        status: 'To Do',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[API:Join] Application ingested into CRM for:', data.email);
    }


    return NextResponse.json(
      {
        success: true,
        message: 'Your application has been received. Our community team will review your profile and reach out within 48 hours.',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('[API:Join] Processing exception:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your application.',
      },
      { status: 500 }
    );
  }
}
