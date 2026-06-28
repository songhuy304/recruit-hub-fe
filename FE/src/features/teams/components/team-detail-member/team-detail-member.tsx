'use client';

import { MemberListing } from './member-listing';

interface TeamDetailMemberProps {
  teamId: number;
}

function TeamDetailMember({ teamId }: TeamDetailMemberProps) {
  return <MemberListing teamId={teamId ?? 0} />;
}

export { TeamDetailMember };
