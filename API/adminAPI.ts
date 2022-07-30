import type { Employer, JobWithPopulatedFields } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import type { SearchFilter } from '@/pages/admin/employers';

import { API } from './config';

export enum EmployerFilter {
  ALL = 'all',
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
  BANNED = 'banned',
  UNBANNED = 'unbanned',
}

class AdminAPI {
  static getEmployers = async (
    data: {
      page: number;
      limit: number;
      filter: EmployerFilter;
      searchFilter?: SearchFilter['type'];
      searchQuery?: string;
    },
    headers?: AxiosRequestHeaders
  ) =>
    API.get<{ employers: Employer[]; count: number }>(
      `/admin/employers?page=${data.page}&limit=${data.limit}&filter=${
        data.filter
      }&searchFilter=${data.searchFilter || 'id'}&searchQuery=${
        data.searchQuery || ''
      }`,
      {
        headers,
      }
    );

  static getEmployer = async (id: string, headers?: AxiosRequestHeaders) =>
    API.get<{ employer: Employer; jobs: JobWithPopulatedFields }>(
      `/admin/employer/${id}`,
      {
        headers,
      }
    );

  static verifyEmployer = async (id: string) =>
    API.put(`/admin/employer/verify/${id}`);

  static addCategory = async (data: { name: string }) =>
    API.post('/admin/jobcategory', { name: data.name });

  static addSkills = async (name: string) =>
    API.post('/admin/skills', { name });
}

export default AdminAPI;
