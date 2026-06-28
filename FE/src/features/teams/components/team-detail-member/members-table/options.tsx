import { TEAM_ROLE_OPTIONS } from '@/constants/options';

export const SYSTEM_ROLE_OPTIONS = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' }
];

export const TEAM_ROLE_FILTER_OPTIONS = [
  { value: 'OWNER', label: 'Owner' },
  ...TEAM_ROLE_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label.charAt(0) + option.label.slice(1).toLowerCase()
  }))
];
