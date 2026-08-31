import { redirect } from 'next/navigation';

export default async function EventRegistrationsRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/crm/events/${id}/attendees`);
}
