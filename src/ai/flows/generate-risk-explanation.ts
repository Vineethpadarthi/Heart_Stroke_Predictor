'use server';

/**
 * @fileOverview Generates a personalized explanation of stroke risk based on input data.
 *
 * - generateRiskExplanation - A function that handles the generation of the risk explanation.
 * - GenerateRiskExplanationInput - The input type for the generateRiskExplanation function.
 * - GenerateRiskExplanationOutput - The return type for the generateRiskExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRiskExplanationInputSchema = z.object({
  gender: z.string().describe('The gender of the patient.'),
  age: z.number().describe('The age of the patient in years.'),
  hypertension: z.boolean().describe('Whether the patient has hypertension.'),
  heartDisease: z.boolean().describe('Whether the patient has heart disease.'),
  everMarried: z.boolean().describe('Whether the patient has ever been married.'),
  workType: z.string().describe('The work type of the patient.'),
  residenceType: z.string().describe('The residence type of the patient.'),
  avgGlucoseLevel: z.number().describe('The average glucose level of the patient.'),
  bmi: z.number().describe('The BMI of the patient.'),
  smokingStatus: z.string().describe('The smoking status of the patient.'),
  strokeRiskScore: z.number().describe('The pre calculated stroke risk score of the patient.'),
});
export type GenerateRiskExplanationInput = z.infer<
  typeof GenerateRiskExplanationInputSchema
>;

const GenerateRiskExplanationOutputSchema = z.object({
  explanation: z.string().describe('A personalized explanation of the stroke risk.'),
});
export type GenerateRiskExplanationOutput = z.infer<
  typeof GenerateRiskExplanationOutputSchema
>;

export async function generateRiskExplanation(
  input: GenerateRiskExplanationInput
): Promise<GenerateRiskExplanationOutput> {
  return generateRiskExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRiskExplanationPrompt',
  input: {schema: GenerateRiskExplanationInputSchema},
  output: {schema: GenerateRiskExplanationOutputSchema},
  prompt: `You are an expert medical professional specializing in explaining stroke risk to patients.

  Based on the patient's data, generate a personalized explanation of their stroke risk.
  The explanation should be easy to understand and should include the factors contributing to their risk and preventative recommendations.

  Patient Data:
  Gender: {{{gender}}}
  Age: {{{age}}}
  Hypertension: {{{hypertension}}}
  Heart Disease: {{{heartDisease}}}
  Ever Married: {{{everMarried}}}
  Work Type: {{{workType}}}
  Residence Type: {{{residenceType}}}
  Average Glucose Level: {{{avgGlucoseLevel}}}
  BMI: {{{bmi}}}
  Smoking Status: {{{smokingStatus}}}
  Stroke Risk Score: {{{strokeRiskScore}}}
  `,
});

const generateRiskExplanationFlow = ai.defineFlow(
  {
    name: 'generateRiskExplanationFlow',
    inputSchema: GenerateRiskExplanationInputSchema,
    outputSchema: GenerateRiskExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
