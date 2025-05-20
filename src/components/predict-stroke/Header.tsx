import { HeartPulse } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-8 bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <HeartPulse className="h-12 w-12" />
          <div>
            <h1 className="text-4xl font-bold">PredictStroke</h1>
            <p className="text-lg text-primary-foreground/90">
              Assess your stroke risk and get personalized insights.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
