
"use server";

import type { PatientData } from "@/lib/zod-schemas";
import {
  generateRiskExplanation,
  type GenerateRiskExplanationInput,
} from "@/ai/flows/generate-risk-explanation";
import {
  generatePreventiveRecommendations,
  type GeneratePreventiveRecommendationsInput,
} from "@/ai/flows/generate-preventive-recommendations";

export interface PredictionResult {
  strokeRiskScore: number;
  explanation?: string;
  recommendations?: string;
  error?: string;
}

// Simple mock function to calculate stroke risk score
const calculateMockStrokeRiskScore = (data: PatientData): number => {
  let score = 0;

  if (data.age > 50) score += Math.min(20, (data.age - 50) * 0.5); // Max 20 points from age
  if (data.hypertension) score += 15;
  if (data.heartDisease) score += 15;
  if (data.avgGlucoseLevel > 120) score += Math.min(15, (data.avgGlucoseLevel - 120) * 0.25); // Max 15
  if (data.bmi > 25) score += Math.min(15, (data.bmi - 25) * 0.5); // Max 15
  if (data.smokingStatus === "smokes") score += 20;
  if (data.smokingStatus === "formerly smoked") score += 10;
  
  // Normalize to a 0-100 scale (roughly)
  return Math.min(100, Math.max(0, Math.round(score)));
};

const deriveRiskFactorsString = (data: PatientData): string => {
  const factors: string[] = [];
  if (data.hypertension) factors.push("high blood pressure");
  if (data.heartDisease) factors.push("heart disease");
  if (data.smokingStatus === "smokes") factors.push("smoking");
  if (data.smokingStatus === "formerly smoked") factors.push("previous smoking");
  if (data.bmi > 30) factors.push("obesity (BMI > 30)");
  else if (data.bmi > 25) factors.push("overweight (BMI > 25)");
  if (data.avgGlucoseLevel > 125) factors.push("high glucose levels");
  if (data.age > 60) factors.push("advanced age");

  if (factors.length === 0) return "general wellness factors";
  return factors.join(', ');
}

export async function getStrokePrediction(
  data: PatientData
): Promise<PredictionResult> {
  try {
    const strokeRiskScore = calculateMockStrokeRiskScore(data);

    const riskExplanationInput: GenerateRiskExplanationInput = {
      gender: data.gender,
      age: data.age,
      hypertension: data.hypertension,
      heartDisease: data.heartDisease,
      everMarried: data.everMarried === "Yes",
      workType: data.workType,
      residenceType: data.residenceType,
      avgGlucoseLevel: data.avgGlucoseLevel,
      bmi: data.bmi,
      smokingStatus: data.smokingStatus,
      strokeRiskScore: strokeRiskScore,
    };

    const riskFactors = deriveRiskFactorsString(data);
    const preventiveRecommendationsInput: GeneratePreventiveRecommendationsInput = {
      riskFactors: riskFactors,
      age: data.age,
      gender: data.gender,
    };

    // It's better to run these in parallel if they don't depend on each other
    const [explanationResult, recommendationsResult] = await Promise.all([
      generateRiskExplanation(riskExplanationInput),
      generatePreventiveRecommendations(preventiveRecommendationsInput)
    ]);

    return {
      strokeRiskScore,
      explanation: explanationResult.explanation,
      recommendations: recommendationsResult.recommendations,
    };
  } catch (error) {
    console.error("Error in getStrokePrediction:", error);
    return {
      strokeRiskScore: calculateMockStrokeRiskScore(data), // still return score
      error:
        "An error occurred while generating the prediction. Please try again.",
    };
  }
}
