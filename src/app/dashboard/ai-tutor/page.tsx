import { AppHeader } from '@/components/layout/header';
import { TutorClient } from '@/components/ai-tutor/tutor-client';
import { currentUser } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function AiTutorPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'AI Tutor' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <AppHeader breadcrumbs={breadcrumbs} />
      <main className="grid flex-1 items-start gap-4 px-6 sm:py-0">
        <div className="flex flex-col h-full">
            <div className="py-4">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    AI-Powered Tutor
                </h1>
                <p className="text-muted-foreground">
                    Your personal assistant for tackling tough STEM concepts.
                </p>
            </div>
            <TutorClient userProfile={currentUser} />
        </div>
      </main>
    </div>
  );
}
