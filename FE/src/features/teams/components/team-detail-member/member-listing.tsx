'use client';

import { TeamMembersTable } from './members-table';

interface MemberListingProps {
  teamId: number;
}

function MemberListing({ teamId }: MemberListingProps) {
  return (
    <TeamMembersTable teamId={teamId} />
  );
}

export { MemberListing };
