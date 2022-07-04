import { accountCreationSchema, addressSchema } from 'schemas';
import { z } from 'zod';

export const education = z.object({
  degree: z
    .string()
    .min(2, { message: 'Degree should have at least 2 characters' }),
  institute: z
    .string()
    .min(2, { message: 'Institute should have at least 2 characters' }),
  startYear: z
    .number()
    .min(1900, { message: 'Start year should be at least 1900' }),
  endYear: z
    .number()
    .min(1900, { message: 'End year should be at least 1900' }),
  percentage: z.number().min(0, { message: 'Percentage should be at least 0' }),
});

export const experience = z.object({
  role: z
    .string()
    .min(2, { message: 'Role should have at least 2 characters' }),
  company: z
    .string()
    .min(2, { message: 'Company should have at least 2 characters' }),
  startYear: z
    .number()
    .min(1900, { message: 'Start year should be at least 1900' }),
  endYear: z
    .number()
    .min(1900, { message: 'End year should be at least 1900' }),
  description: z
    .string()
    .min(10, { message: 'Description should have at least 10 characters' })
    .max(100, { message: 'Description can have at most 100 characters' })
    .optional(),
});

export const JobSeekerResumeSchema = accountCreationSchema.extend({
  address: addressSchema,
  dob: z.date(),
  about: z
    .string()
    .max(1000, { message: 'About can have at most 1000 characters' }),
  education: z.array(education),
  experience: z.array(experience),
  skills: z.array(z.string()),
  jobPreferences: z.array(z.string()),
});

export type JobSeekerResumeFormData = z.infer<typeof JobSeekerResumeSchema>;
