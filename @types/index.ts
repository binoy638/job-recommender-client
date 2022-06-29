export enum UserType {
  EMPLOYER = 'employer',
  JOBSEEKER = 'jobseeker',
  ADMIN = 'admin',
}

export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Company {
  name: string;
  description: string;
  yearFounded: number;
  website: string;
  logo: string;
  address: Address;
}

export interface Employer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  company: Company;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum JobMode {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
}

export interface Job {
  jobTitle: string;
  employer: string;
  requiredSkills?: string[];
  mode: JobMode;
  numberOfOpenings: number;
  location?: Address[];
  category: string;
  ctc?: number;
  applyBy: string;
  startDate?: string;
  description: string;
}

export interface Admin {
  username: string;
  email: string;
}

export interface JobCategories {
  _id: string;
  name: string;
}

export interface SvgProps {
  width?: number;
  height?: number;
}

export interface Education {
  degree: string;
  institute: string;
  startYear: number;
  endYear: number;
  percentage: number;
}

export interface Experience {
  role: string;
  startYear: number;
  endYear: number;
  company: string;
  description: string;
}

export interface JobSeeker {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  address: Address;
  about: string;
  education: Education[];
  experience: Experience[];
  //* store skill id's
  skills?: string[];
  //* store jobcategory id's
  jobPreferences: string[];
  resume?: string;
}
