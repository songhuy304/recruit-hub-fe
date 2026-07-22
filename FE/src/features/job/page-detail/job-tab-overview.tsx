import { RichTextEditor } from "@/components/rte-editor";
import { TextEditor } from "@/components/rte-editor/text-editor";
import { Typography } from "@/components/ui/typography";
import { IJobDetail } from "@/features/job/types";
import { useTranslations } from "next-intl";

interface JobTabOverviewProps {
  jobDetail: IJobDetail | undefined;
}

const JobTabOverview = ({ jobDetail }: JobTabOverviewProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Typography variant="h6">Job description</Typography>
        <Typography variant="paragraph-sm">
          <TextEditor value={jobDetail?.description} editable={false} />
        </Typography>
      </div>

      <div>
        <Typography variant="h6">Requirements</Typography>
        <Typography variant="paragraph-sm">
          <TextEditor value={jobDetail?.requirements} editable={false} />
        </Typography>
      </div>

      <div>
        <Typography variant="h6">Benefits</Typography>
        <Typography variant="paragraph-sm">
          <TextEditor value={jobDetail?.benefits} editable={false} />
        </Typography>
      </div>
    </div>
  );
};

export default JobTabOverview;
