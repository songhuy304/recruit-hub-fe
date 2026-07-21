import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EJobStatus } from "@/features/job/enums";
import { useGetJobSummary } from "@/features/job/hooks";
import { useGetDepartment, useGetLocation } from "@/hooks/options";
import { useTranslations } from "next-intl";
import { SetValues } from "nuqs";
import { employmentTypeOptions, levelOptions } from "../../constants";
import { JobSearchParams, jobSearchParsers } from "../job-search-params";

interface JobListFilterProps {
  params: JobSearchParams;
  handleSubmit: (values: JobSearchParams) => void;
  handleReset: () => void;
  setParams: SetValues<typeof jobSearchParsers>;
}

const JobListFilter = ({
  params,
  handleSubmit,
  handleReset,
  setParams,
}: JobListFilterProps) => {
  const t = useTranslations();
  const { options } = useGetLocation();
  const { options: departmentOptions } = useGetDepartment();
  const { data, isPending, isFetching } = useGetJobSummary({
    jobType: params.jobType ?? undefined,
    level: params.level ?? undefined,
    department: params.department ?? undefined,
    location: params.location ?? undefined,
  });

  const sum = data?.data;

  return (
    <div className="space-y-4">
      <FormFilter<JobSearchParams>
        defaultValues={params}
        fields={[
          {
            type: "text",
            name: "q",
            placeholder: t("field.search.placeholder"),
            leftIcon: <Icons.search className="size-4" />,
            className: "w-full",
          },
          {
            type: "multiSelect",
            name: "jobType",
            multiple: true,
            placeholder: t("field.employment-type.placeholder"),
            options: employmentTypeOptions,
          },
          {
            type: "multiSelect",
            name: "level",
            multiple: true,
            placeholder: t("field.level.placeholder"),
            options: levelOptions,
          },
          {
            type: "multiSelect",
            multiple: true,
            name: "location",
            placeholder: t("field.location.placeholder"),
            options: options,
          },
          {
            type: "multiSelect",
            multiple: true,
            name: "department",
            placeholder: t("field.departments.placeholder"),
            options: departmentOptions,
          },
          // {
          //   type: "dateRange",
          //   name: "createdAt",
          //   placeholder: t("field.createdDate.placeholder"),
          // },
        ]}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      <Tabs
        variant="underline"
        defaultValue={params.status || EJobStatus.OPEN}
        onValueChange={(value) => setParams({ status: value as EJobStatus })}
      >
        <TabsList className="w-full">
          <TabsTrigger
            meta={{
              count: sum?.open ?? 0,
              isLoading: isPending || isFetching,
            }}
            value={EJobStatus.OPEN}
          >
            {t("Jobs.stats.open")}
          </TabsTrigger>
          <TabsTrigger
            value={EJobStatus.ARCHIVED}
            meta={{
              count: sum?.achieved ?? 0,
              isLoading: isPending || isFetching,
            }}
          >
            {t("Jobs.stats.archived")}
          </TabsTrigger>
          <TabsTrigger
            value={EJobStatus.DRAFT}
            meta={{
              count: sum?.draft ?? 0,
              isLoading: isPending || isFetching,
            }}
          >
            {t("Jobs.stats.draft")}
          </TabsTrigger>
          <TabsTrigger
            value={EJobStatus.CLOSED}
            meta={{
              count: sum?.closed ?? 0,
              isLoading: isPending || isFetching,
            }}
          >
            {t("Jobs.stats.closed")}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export { JobListFilter };
