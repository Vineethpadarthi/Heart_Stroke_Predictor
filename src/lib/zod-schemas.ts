import { z } from 'zod';

export const PatientDataSchema = z.object({
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: "Gender is required." }),
  age: z.coerce.number().min(1, "Age must be greater than 0.").max(120, "Age seems too high."),
  hypertension: z.boolean().default(false),
  heartDisease: z.boolean().default(false),
  everMarried: z.enum(['Yes', 'No'], { required_error: "Marital status is required." }),
  workType: z.enum(['Private', 'Self-employed', 'Govt_job', 'children', 'Never_worked'], { required_error: "Work type is required." }),
  residenceType: z.enum(['Urban', 'Rural'], { required_error: "Residence type is required." }),
  avgGlucoseLevel: z.coerce.number().min(30, "Average glucose level seems too low.").max(500, "Average glucose level seems too high."),
  bmi: z.coerce.number().min(10, "BMI seems too low.").max(100, "BMI seems too high."),
  smokingStatus: z.enum(['formerly smoked', 'never smoked', 'smokes', 'Unknown'], { required_error: "Smoking status is required." }),
});

export type PatientData = z.infer<typeof PatientDataSchema>;
