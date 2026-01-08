import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

type LeaderboardTableProps = {
  users: User[];
};

export function LeaderboardTable({ users }: LeaderboardTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const avatar = PlaceHolderImages.find(
              (img) => img.id === user.avatarId
            );
            const rankColor =
              user.rank === 1
                ? 'text-yellow-500'
                : user.rank === 2
                ? 'text-gray-400'
                : user.rank === 3
                ? 'text-yellow-700'
                : '';
            return (
              <TableRow key={user.id} className={user.rank === 1 ? 'bg-primary/5' : ''}>
                <TableCell className="font-medium text-lg">
                    <div className="flex items-center gap-2">
                        {user.rank <= 3 ? <Trophy className={cn("h-5 w-5", rankColor)} /> : <span className="w-5" />}
                        {user.rank}
                    </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {avatar && (
                        <AvatarImage
                          src={avatar.imageUrl}
                          alt={avatar.description}
                          data-ai-hint={avatar.imageHint}
                        />
                      )}
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {user.points.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
