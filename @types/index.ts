import type { CompanyFormData, JobFormData } from 'schemas';

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
  employees: number;
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

export enum WorkHours {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
}

export enum JobMode {
  WFH = 'WFH',
  WFO = 'WFO',
}

export interface Job extends JobFormData {
  _id: string;
  id: number;
  isActive: boolean;
  createdAt: string;
  applications: string[];
}

export interface Admin {
  username: string;
  email: string;
}

export interface Skill {
  _id: string;
  name: string;
}

export interface JobCategory {
  _id: string;
  name: string;
}

export interface SvgProps {
  width?: number;
  height?: number;
}

export interface Education {
  _id?: string;
  degree: string;
  institute: string;
  startYear: number;
  endYear: number;
}

export interface Experience {
  _id?: string;
  role: string;
  startYear: number;
  endYear?: number;
  company: string;
  description?: string;
}

export interface JobSeeker {
  id: string;
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
  skills?: Skill[];
  //* store jobcategory id's
  jobPreferences: string[];
  resume?: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  phoneCode: string;
}

export interface State {
  id: number;
  name: string;
  countryID: number;
}

export interface City {
  name: string;
  stateID: number;
}

export interface JobWithPopulatedFields
  extends Omit<Job, 'category' | 'employer' | 'requiredSkills'> {
  category: JobCategory;
  employer: Pick<Employer, 'company'>;
  requiredSkills: Skill[];
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  SHORTLISTED = 'SHORTLISTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface JobSeekerJobApplication {
  id: number;
  job: {
    jobTitle: string;
    employer: {
      company: CompanyFormData;
    };
    applications: string[];
  };
  status: ApplicationStatus;
  createdAt: string;
}

export interface EmployerJobApplication {
  id: number;
  job: string;
  jobSeeker: JobSeeker;
  status: ApplicationStatus;
  createdAt: string;
}

export enum JobSearchType {
  SKILL = 'skill',
  LOCATION = 'location',
  CATEGORY = 'category',
  JOB_TITLE = 'jobTitle',
  COMPANY = 'company',
}
