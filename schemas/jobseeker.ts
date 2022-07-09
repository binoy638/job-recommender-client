import { addressSchema } from 'schemas';
import { z } from 'zod';

export const educationSchema = z.object({
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
});

export type EducationFormData = z.infer<typeof educationSchema>;

export const experienceSchema = z.object({
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
    .min(1900, { message: 'End year should be at least 1900' })
    .optional(),
  description: z
    .string()
    .max(1000, { message: 'Description can have at most 100 characters' })
    .optional(),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

export const JobSeekerResumeSchema = z.object({
  address: addressSchema,
  dob: z.date(),
  about: z
    .string()
    .max(1000, { message: 'About can have at most 1000 characters' }),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  skills: z.array(z.string()),
  jobPreferences: z.array(z.string()),
});

export type JobSeekerResumeFormData = z.infer<typeof JobSeekerResumeSchema>;
