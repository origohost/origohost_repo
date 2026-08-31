import { MembersRepository } from '@/repositories/crm/members.repository';
import type { CommunityMember } from '@/types/crm';

export class CommunityService {
  public async getMembers(query?: string): Promise<CommunityMember[]> {
    return MembersRepository.findAll(query);
  }
}

export const communityService = new CommunityService();

