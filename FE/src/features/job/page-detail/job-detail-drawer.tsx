import { CommonDrawer } from "@/components/drawer/drawer-common";
import { useGetJobDetails } from "@/features/job/hooks";
import { JobDetailHeader } from "@/features/job/page-detail/job-detail-header";
import { JobDetailTab } from "@/features/job/page-detail/job-detail-tab";
import { JobDetailTitle } from "@/features/job/page-detail/job-detail-title";

interface JobDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: number | null;
}

const JobDetailDrawer = ({ open, onOpenChange, jobId }: JobDetailDrawerProps) => {
  const { data: jobDetail, isLoading } = useGetJobDetails({
    id: jobId ?? undefined,
    enabled: open && !!jobId && jobId > 0,
  });

  return (
    <CommonDrawer
      hideFooter
      className={{
        container: "data-[vaul-drawer-direction=right]:sm:max-w-2xl",
      }}
      direction="right"
      open={open}
      loading={isLoading}
      title={<JobDetailTitle jobDetail={jobDetail?.data} />}
      onOpenChange={onOpenChange}
    >
      <div>
        <JobDetailHeader jobDetail={jobDetail?.data} />
        <JobDetailTab jobDetail={jobDetail?.data} />
      </div>
    </CommonDrawer>
  );
};

export { JobDetailDrawer };
