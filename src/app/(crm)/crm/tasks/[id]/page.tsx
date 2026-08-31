import { redirect } from 'next/navigation';

export default async function TaskDetailRedirect() {
  redirect('/crm/tasks');
}
