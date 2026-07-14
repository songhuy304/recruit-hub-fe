import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export function JobPreviewCard() {
  return (
    <Card className='border-border/60 bg-muted/5 border border-dashed shadow-none'>
      <CardContent className='flex min-h-[220px] flex-col items-center justify-center space-y-4 p-8 text-center'>
        <div className='bg-muted/40 border-border/50 rounded-full border p-4'>
          <Icons.post className='text-muted-foreground/70 h-8 w-8' />
        </div>
        <div className='max-w-[200px] space-y-1.5'>
          <h4 className='text-foreground/80 text-sm font-medium'>Job post preview</h4>
          <p className='text-muted-foreground text-xs leading-normal'>
            Fill in the details to see a preview of your job post.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
