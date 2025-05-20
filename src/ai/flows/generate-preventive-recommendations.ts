'use server';
/**
 * @fileOverview Generates a list of actionable recommendations tailored to the individual's risk profile to mitigate stroke risk.
 *
 * - generatePreventiveRecommendations - A function that handles the generation of preventive recommendations.
 * - GeneratePreventiveRecommendationsInput - The input type for the generatePreventiveRecommendations function.
 * - GeneratePreventiveRecommendationsOutput - The return type for the generatePreventiveRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePreventiveRecommendationsInputSchema = z.object({
  riskFactors: z
    .string()
    .describe(
      'A comma separated list of risk factors for the patient, e.g. high blood pressure, smoking, obesity.'
    ),
  age: z.number().describe('The age of the patient.'),
  gender: z.string().describe('The gender of the patient.'),
});
export type GeneratePreventiveRecommendationsInput = z.infer<
  typeof GeneratePreventiveRecommendationsInputSchema
>;

const GeneratePreventiveRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of actionable recommendations tailored to the individual’s risk profile, so they can take steps to mitigate their stroke risk.'
    ),
});
export type GeneratePreventiveRecommendationsOutput = z.infer<
  typeof GeneratePreventiveRecommendationsOutputSchema
>;

export async function generatePreventiveRecommendations(
  input: GeneratePreventiveRecommendationsInput
): Promise<GeneratePreventiveRecommendationsOutput> {
  return generatePreventiveRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePreventiveRecommendationsPrompt',
  input: {schema: GeneratePreventiveRecommendationsInputSchema},
  output: {schema: GeneratePreventiveRecommendationsOutputSchema},
  prompt: `You are a medical expert specializing in stroke prevention.

  Based on the patient's risk factors, age, and gender, generate a list of actionable recommendations to mitigate their stroke risk.

  Risk Factors: {{{riskFactors}}}
  Age: {{{age}}}
  Gender: {{{gender}}}

  Recommendations:`,
});

const generatePreventiveRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePreventiveRecommendationsFlow',
    inputSchema: GeneratePreventiveRecommendationsInputSchema,
    outputSchema: GeneratePreventiveRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
