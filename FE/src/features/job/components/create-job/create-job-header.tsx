import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { JobSubmitAction } from "../../types";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('Jobs.create-title')}</h1>
        <p className="text-muted-foreground text-sm">
          {t('Jobs.create-description')}
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
          {t('Jobs.save-draft')}
        </Button>
        <Button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          isLoading={isSubmitting && submittingAction === "publish"}
        >
          {t('Jobs.publish-job')}
        </Button>
        <Button type="button" variant="outline" size="icon" className="h-9 w-9">
          <Icons.ellipsis className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
