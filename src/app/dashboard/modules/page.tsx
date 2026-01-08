import { AppHeader } from '@/components/layout/header';
import { ModuleCard } from '@/components/modules/module-card';
import { modules } from '@/lib/data';

export default function ModulesPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Modules' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AppHeader breadcrumbs={breadcrumbs} />
      <div className="px-6">
        <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
        <p className="text-muted-foreground">
          Choose a subject to start your learning adventure.
        </p>
      </div>
      <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
