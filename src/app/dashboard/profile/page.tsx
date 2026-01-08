import { AppHeader } from '@/components/layout/header';
import { BadgesGrid } from '@/components/profile/badges-grid';
import { currentUser, badges, userBadges as currentUserBadgeIds } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProfilePage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile' },
  ];
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');

  const earnedBadges = badges.filter(badge => currentUserBadgeIds.includes(badge.id));

  return (
    <div className="flex flex-col gap-6">
      <AppHeader breadcrumbs={breadcrumbs} />
      <main className="grid flex-1 items-start gap-4 px-6 sm:py-0">
         <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
                {userAvatar && (
                    <AvatarImage
                    src={userAvatar.imageUrl}
                    alt={userAvatar.description}
                    data-ai-hint={userAvatar.imageHint}
                    />
                )}
                <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{currentUser.name}</h1>
                <p className="text-muted-foreground">Keep up the amazing work!</p>
            </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>My Badges</CardTitle>
            <CardDescription>
              A collection of your achievements and milestones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BadgesGrid badges={earnedBadges} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
