import {
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  parseAsStringEnum,
  type inferParserType,
} from 'nuqs';
import { EJobStatus, EEmploymentType, EJobLevel } from '@/features/job/enums';
import { parseAsDateRange } from '@/lib/parsers';

export const jobSearchParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  jobType: parseAsArrayOf(
    parseAsStringEnum<EEmploymentType>(Object.values(EEmploymentType))
  ),
  level: parseAsArrayOf(
    parseAsStringEnum<EJobLevel>(Object.values(EJobLevel))
  ),
  location: parseAsArrayOf(parseAsString),
  status: parseAsStringEnum<EJobStatus>(Object.values(EJobStatus)),
  sortBy: parseAsString,
  sortOrder: parseAsStringEnum(['ASC', 'DESC'] as const),
  createdAt: parseAsDateRange,
};

export type JobSearchParams = inferParserType<typeof jobSearchParsers>;
