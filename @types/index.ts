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

interface Company {
  name: string;
  description: string;
  yearFounded: number;
  website: string;
  logo: string;
  address: Address;
}

export interface EmployerAttrs {
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

export interface JobCategories {
  _id: string;
  name: string;
}

export interface SvgProps {
  width?: number;
  height?: number;
}
