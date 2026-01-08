import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Badge } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type BadgesGridProps = {
  badges: Badge[];
};

export function BadgesGrid({ badges }: BadgesGridProps) {
  if (badges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No badges earned yet. Keep learning to unlock them!</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {badges.map((badge) => {
          const image = PlaceHolderImages.find((img) => img.id === badge.imageId);
          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger>
                <Card className="flex flex-col items-center justify-center p-4 text-center aspect-square transition-all hover:bg-secondary hover:scale-105">
                  <div className="relative h-20 w-20 mb-2">
                    {image ? (
                        <Image
                            src={image.imageUrl}
                            alt={badge.title}
                            width={80}
                            height={80}
                            className="rounded-full object-cover"
                            data-ai-hint={image.imageHint}
                        />
                    ) : (
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                            <badge.icon className="w-10 h-10 text-muted-foreground" />
                        </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm truncate">{badge.title}</h3>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{badge.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
