import { AppHeader } from '@/components/layout/header';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';
import { users } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LeaderboardPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leaderboard' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AppHeader breadcrumbs={breadcrumbs} />
      <main className="grid flex-1 items-start gap-4 px-6 sm:py-0">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              See how you rank against other learners. Keep up the great work!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardTable users={users} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
