import {
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  parseAsStringEnum,
  type inferParserType,
} from "nuqs";
import { EJobStatus, EEmploymentType, EJobLevel } from "@/features/job/enums";
import { getSortingStateParser, parseAsDateRange } from "@/lib/parsers";

export const jobSearchParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  jobType: parseAsArrayOf(
    parseAsStringEnum<EEmploymentType>(Object.values(EEmploymentType))
  ),
  level: parseAsArrayOf(parseAsStringEnum<EJobLevel>(Object.values(EJobLevel))),
  location: parseAsArrayOf(parseAsString),
  status: parseAsStringEnum<EJobStatus>(Object.values(EJobStatus)).withDefault(
    EJobStatus.OPEN
  ),
  sort: getSortingStateParser(),
  createdAt: parseAsDateRange,
  department: parseAsArrayOf(parseAsString),
};

export type JobSearchParams = inferParserType<typeof jobSearchParsers>;
