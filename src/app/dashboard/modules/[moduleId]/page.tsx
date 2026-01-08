import { notFound } from 'next/navigation';
import { AppHeader } from '@/components/layout/header';
import { modules } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizClient } from '@/components/modules/quiz-client';
import { Quote } from 'lucide-react';

type ModulePageProps = {
  params: {
    moduleId: string;
  };
};

export default function ModulePage({ params }: ModulePageProps) {
  const module = modules.find((m) => m.id === params.moduleId);

  if (!module) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Modules', href: '/dashboard/modules' },
    { label: module.title },
  ];

  const { icon: Icon, ...serializableModule } = module;

  return (
    <div className="flex flex-col gap-6">
      <AppHeader breadcrumbs={breadcrumbs} />
      <div className="px-6 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
                    <p className="text-muted-foreground">{module.description}</p>
                </CardHeader>
                <CardContent>
                    <QuizClient module={serializableModule} />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
            <Card className="bg-accent/20 border-accent">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Quote className="h-5 w-5 text-accent" />
                        Cultural Connect
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{module.culturalContext}</CardDescription>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
