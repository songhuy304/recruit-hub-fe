import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobTabOverview from "@/features/job/page-detail/job-tab-overview";
import { IJobDetail } from "@/features/job/types";
import { useTranslations } from "next-intl";

enum ETab {
  OVERVIEW = "overview",
  CANDIDATES = "candidates",
  ACTIVITY = "activity",
  INTERVIEWS = "interviews",
}

interface JobDetailTabProps {
  jobDetail: IJobDetail | undefined;
}

const JobDetailTab = ({ jobDetail }: JobDetailTabProps) => {
  const t = useTranslations();
  return (
    <div className="mt-3 border-t">
      <Tabs variant="underline" defaultValue={ETab.OVERVIEW}>
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value={ETab.OVERVIEW}>
            {t("Common.overview")}
          </TabsTrigger>
          <TabsTrigger className="flex-1" value={ETab.CANDIDATES}>
            {t("Common.candidates")}
          </TabsTrigger>
          <TabsTrigger className="flex-1" value={ETab.ACTIVITY}>
            {t("Common.activity")}
          </TabsTrigger>
          <TabsTrigger className="flex-1" value={ETab.INTERVIEWS}>
            {t("Common.interviews")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={ETab.OVERVIEW}>
          <JobTabOverview jobDetail={jobDetail} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { JobDetailTab };
