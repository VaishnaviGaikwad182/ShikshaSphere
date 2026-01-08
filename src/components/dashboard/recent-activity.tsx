import { activities } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <activity.icon className="h-5 w-5 text-secondary-foreground" />
             </div>
             {index !== activities.length - 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" />
             )}
          </div>
          <div className="flex-1 pt-1.5">
            <p className="text-sm font-medium">{activity.text}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
