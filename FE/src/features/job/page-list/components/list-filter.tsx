import { FormFilter } from "@/components/forms/form-filter";
import { Icons } from "@/components/icons";
import { employmentTypeOptions, levelOptions } from "../../constants";
import { useGetLocation } from "@/hooks/options";
import { Card, CardContent } from "@/components/ui/card";
import { JobSearchParams } from "../job-search-params";

interface JobListFilterProps {
  params: JobSearchParams;
  handleSubmit: (values: JobSearchParams) => void;
  handleReset: () => void;
}

const JobListFilter = ({ params, handleSubmit, handleReset }: JobListFilterProps) => {
  const { options } = useGetLocation();

  return (
    <Card>
      <CardContent>
        <FormFilter<JobSearchParams>
          defaultValues={params}
          fields={[
            {
              type: "text",
              name: "q",
              placeholder: "Search jobs by title, keywords...",
              leftIcon: <Icons.search className="size-4" />,
              className: "w-full",
            },
            {
              type: "multiSelect",
              name: "jobType",
              multiple: true,
              placeholder: "Select job type",
              options: employmentTypeOptions,
            },
            {
              type: "multiSelect",
              name: "level",
              multiple: true,
              placeholder: "Select level",
              options: levelOptions,
            },
            {
              type: "multiSelect",
              multiple: true,
              name: "location",
              placeholder: "Select location",
              options: options,
            },
            {
              type: "dateRange",
              name: "createdAt",
              placeholder: "Select created date",
            }
          ]}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </CardContent>
    </Card>
  );
};

export { JobListFilter };
