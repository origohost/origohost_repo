import type { CommunityMember } from '@/types/crm';
import { MembersRepository } from '@/repositories/crm/members.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';
import { revalidateCommunityCache } from '@/lib/cache/revalidate';

export async function getMembers(
  query?: string,
  roleFilter?: string,
  chapterFilter?: string,
  statusFilter?: string
): Promise<ServiceResult<CommunityMember[]>> {
  const members = await MembersRepository.findAll(query, {
    role: roleFilter,
    chapter: chapterFilter,
    status: statusFilter,
  });
  return { success: true, data: members };
}

export async function getMemberById(id: string): Promise<ServiceResult<CommunityMember | null>> {
  const member = await MembersRepository.findById(id);
  return { success: !!member, data: member, error: member ? undefined : 'Community Member not found' };
}

export async function createMember(
  data: Partial<CommunityMember>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CommunityMember>> {
  const newMember = await MembersRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Member', newMember.id);
  await revalidateCommunityCache();
  return { success: true, data: newMember };
}

export async function updateMember(
  id: string,
  data: Partial<CommunityMember>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CommunityMember>> {
  const updated = await MembersRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Member', id);
  await revalidateCommunityCache();
  return { success: true, data: updated };
}

export async function deleteMember(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await MembersRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Member', id);
    await revalidateCommunityCache();
  }
  return { success, data: success };
}


export const memberService = {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
