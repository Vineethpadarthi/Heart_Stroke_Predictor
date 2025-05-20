
"use client";

import type { PatientData } from "@/lib/zod-schemas";
import { useState } from "react";
import { AppHeader } from "@/components/predict-stroke/Header";
import { PatientDataForm } from "@/components/predict-stroke/PatientDataForm";
import { RiskDisplay } from "@/components/predict-stroke/RiskDisplay";
import { getStrokePrediction, type PredictionResult } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: PatientData) => {
    setIsLoading(true);
    setPredictionResult(null); // Clear previous results
    try {
      const result = await getStrokePrediction(data);
      setPredictionResult(result);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
         toast({
          title: "Prediction Complete",
          description: "Stroke risk assessment has been generated.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      setPredictionResult({ strokeRiskScore: 0, error: errorMessage }); // Set some default score or handle as needed
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <PatientDataForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-3">
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-lg font-medium text-foreground">Generating Your Assessment...</p>
                  <p className="text-sm text-muted-foreground">This may take a moment.</p>
                </div>
              </div>
            )}
            {!isLoading && predictionResult && (
              <RiskDisplay
                strokeRiskScore={predictionResult.strokeRiskScore}
                explanation={predictionResult.explanation}
                recommendations={predictionResult.recommendations}
                error={predictionResult.error}
              />
            )}
             {!isLoading && !predictionResult && (
              <div className="flex flex-col justify-center items-center h-full min-h-[300px] bg-card p-8 rounded-lg shadow-md border border-dashed">
                <img src="https://placehold.co/300x200.png" alt="Doctor reviewing report" data-ai-hint="medical health report" className="mb-6 rounded-md opacity-70" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">Stroke Risk Insights Await</h2>
                <p className="text-muted-foreground text-center max-w-md">
                  Fill out the form to receive a personalized stroke risk assessment and actionable recommendations to improve your health.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} PredictStroke. All rights reserved.</p>
        <p className="text-xs mt-1">Disclaimer: This tool is for informational purposes only and not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
}
