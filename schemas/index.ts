import { JobMode, WorkHours } from '@types';
import { z } from 'zod';

export const accountSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name should have at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last Name should have at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number should have at least 10 digits' })
    .regex(/^\d+$/),
  password: z
    .string()
    .min(6, { message: 'Password should have at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password should have at least 6 characters' }),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export const addressSchema = z.object({
  city: z
    .string()
    .min(2, { message: 'City should have at least 2 characters' }),
  state: z
    .string()
    .min(2, { message: 'State should have at least 2 characters' }),
  country: z
    .string()
    .min(2, { message: 'State should have at least 2 characters' }),
});

export type Address = z.infer<typeof addressSchema>;

export const companySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Company Name should have at least 2 characters' }),
  description: z
    .string()
    .min(2, { message: 'Description should have at least 10 characters' })
    .max(1000, {
      message: 'Description can have at most least 1000 characters',
    }),
  employees: z.number().min(1, { message: 'At least 1 employee' }),
  yearFounded: z
    .number()
    .min(1900, { message: 'Year founded should be at least 1900' }),
  website: z.string().url({ message: 'Invalid website' }),
  address: addressSchema,
});

export type CompanyFormData = z.infer<typeof companySchema>;

export const jobPostSchema = z.object({
  jobTitle: z
    .string()
    .min(3, { message: 'Job Title should have at least 3 characters' })
    .max(30, { message: 'Job Title should have at most 50 characters' }),
  mode: z.nativeEnum(JobMode),
  numberOfOpenings: z
    .number()
    .min(1, { message: 'Number of openings should be at least 1' }),
  workHours: z.nativeEnum(WorkHours),
  category: z.string(),
  applyBy: z.date(),
  startDate: z.date(),
  salary: z
    .object({
      min: z.number(),
      max: z.number(),
      negotiable: z.boolean(),
    })
    .optional(),
  description: z
    .string()
    .min(3, { message: 'Description should have at least 3 characters' })
    .max(2000, { message: 'Description should have at most 1000 characters' }),
  requiredSkills: z.array(z.string()),
});

export type JobFormData = z.infer<typeof jobPostSchema>;

export const EmployerProfileEdit = accountSchema
  .omit({
    password: true,
    confirmPassword: true,
  })
  .merge(addressSchema)
  .extend({
    name: z
      .string()
      .min(2, { message: 'Company Name should have at least 2 characters' }),
    description: z
      .string()
      .min(2, { message: 'Description should have at least 10 characters' })
      .max(1000, {
        message: 'Description can have at most least 1000 characters',
      }),
    employees: z
      .number()
      .min(1, { message: 'At least 1 employee is required' }),
    yearFounded: z
      .number()
      .min(1900, { message: 'Year founded should be at least 1900' }),
    website: z.string().url({ message: 'Invalid website' }),
  });
