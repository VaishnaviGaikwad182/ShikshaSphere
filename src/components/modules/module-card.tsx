import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Module } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

type ModuleCardProps = {
  module: Module;
};

export function ModuleCard({ module }: ModuleCardProps) {
  const placeholderImage = PlaceHolderImages.find(
    (img) => img.id === module.imageId
  );

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <module.icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{module.title}</CardTitle>
          <CardDescription>{module.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {placeholderImage && (
          <div className="relative aspect-video">
            <Image
              src={placeholderImage.imageUrl}
              alt={placeholderImage.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={placeholderImage.imageHint}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between bg-secondary/30 p-4">
        <Badge variant="secondary">{module.subject}</Badge>
        <Button asChild size="sm" variant="ghost">
          <Link href={`/dashboard/modules/${module.id}`}>
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
