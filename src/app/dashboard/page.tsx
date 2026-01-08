import { AppHeader } from '@/components/layout/header';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { currentUser } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const breadcrumbs = [{ label: 'Dashboard' }];

  return (
    <div className="flex flex-col gap-6">
      <AppHeader breadcrumbs={breadcrumbs} />
      <div className="px-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">Here's a summary of your learning journey.</p>
      </div>
      <div className="grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards />
      </div>
      <div className="grid gap-6 px-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ProgressChart />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <RecentActivity />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
