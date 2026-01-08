import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Flame, BookCheck, BarChart3 } from 'lucide-react';
import { users } from '@/lib/data';

export function OverviewCards() {
  const currentUser = users[0];
  const totalModules = 4; // Assuming 4 modules from data.ts
  
  const stats = [
    { title: 'Points Earned', value: currentUser.points.toLocaleString(), icon: Star, color: 'text-yellow-500' },
    { title: 'Weekly Streak', value: '5 Days', icon: Flame, color: 'text-orange-500' },
    { title: 'Modules Completed', value: `3 / ${totalModules}`, icon: BookCheck, color: 'text-green-500' },
    { title: 'Leaderboard Rank', value: `#${currentUser.rank}`, icon: BarChart3, color: 'text-blue-500' },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
