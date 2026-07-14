import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { JobSubmitAction } from "../../types";

interface CreateJobHeaderProps {
  onSaveDraft: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
  submittingAction?: JobSubmitAction | null;
}

export function CreateJobHeader({
  onSaveDraft,
  onPublish,
  isSubmitting = false,
  submittingAction = null,
}: CreateJobHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Job</h1>
        <p className="text-muted-foreground text-sm">
          Post a new job opening and attract top talent.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting}
          isLoading={isSubmitting && submittingAction === "draft"}
        >
          Save draft
        </Button>
        <Button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          isLoading={isSubmitting && submittingAction === "publish"}
        >
          Publish job
        </Button>
        <Button type="button" variant="outline" size="icon" className="h-9 w-9">
          <Icons.ellipsis className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
