import { CommonDrawer } from "@/components/drawer/drawer-common";
import { Spinner } from "@/components/ui/spinner";
import { useGetJobDetails } from "@/features/job/hooks";
import { JobDetailHeader } from "@/features/job/page-detail/job-detail-header";
import { JobDetailTab } from "@/features/job/page-detail/job-detail-tab";

interface JobDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: number | null;
}

const JobDetailDrawer = ({ open, onOpenChange, jobId }: JobDetailDrawerProps) => {
  const { data: jobDetail, isLoading } = useGetJobDetails({
    id: jobId ?? 0,
    enabled: open && !!jobId,
  });

  return (
    <CommonDrawer
      hideFooter
      className={{
        container: "data-[vaul-drawer-direction=right]:sm:max-w-2xl",
      }}
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <JobDetailHeader jobDetail={jobDetail?.data} />
          <JobDetailTab jobDetail={jobDetail?.data} />
        </div>
      )}
    </CommonDrawer>
  );
};

export { JobDetailDrawer };
