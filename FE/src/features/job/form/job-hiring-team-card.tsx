import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HiringTeamMember {
  initials: string;
  name: string;
  role: string;
  badge: 'owner' | 'member';
}

const hiringTeamMembers: HiringTeamMember[] = [
  {
    initials: 'MT',
    name: 'Mai Tú',
    role: 'Recruiter Lead',
    badge: 'owner'
  },
  {
    initials: 'MA',
    name: 'Minh Anh',
    role: 'HR Manager',
    badge: 'member'
  },
  {
    initials: 'HN',
    name: 'Hoàng Nam',
    role: 'Tech Lead',
    badge: 'member'
  }
];

function HiringTeamMemberRow({ member }: { member: HiringTeamMember }) {
  const t = useTranslations();
  const isOwner = member.badge === 'owner';

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Avatar className='border-border/60 h-9 w-9 border'>
          <AvatarImage src='' />
          <AvatarFallback className='bg-primary/5 text-primary text-xs font-semibold'>
            {member.initials}
          </AvatarFallback>
        </Avatar>
        <div className='space-y-0.5'>
          <h4 className='text-foreground text-sm font-medium'>{member.name}</h4>
          <p className='text-muted-foreground text-xs'>{member.role}</p>
        </div>
      </div>
      <Badge
        variant='secondary'
        className={cn(
          'rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase',
          isOwner
            ? 'border border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100'
            : 'border text-muted-foreground bg-muted hover:bg-muted'
        )}
      >
        {isOwner ? t('Jobs.hiring-team-owner') : t('Jobs.hiring-team-member')}
      </Badge>
    </div>
  );
}

export function JobHiringTeamCard() {
  const t = useTranslations();

  return (
    <Card className='border-border/80 border shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base font-semibold'>{t('Jobs.hiring-team-title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-3.5'>
          {hiringTeamMembers.map((member) => (
            <HiringTeamMemberRow key={member.initials} member={member} />
          ))}
        </div>

        <Button
          type='button'
          variant='outline'
          className='border-border hover:bg-accent mt-2 h-9 w-full gap-1.5 border-dashed text-xs'
        >
          <Icons.add className='text-muted-foreground h-3.5 w-3.5' />
          {t('Jobs.hiring-team-add')}
        </Button>
      </CardContent>
    </Card>
  );
}
