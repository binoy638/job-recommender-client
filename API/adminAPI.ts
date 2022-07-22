import type { Employer } from '@types';
import type { AxiosRequestHeaders } from 'axios';

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
    data: { page: number; limit: number; filter: EmployerFilter },
    headers?: AxiosRequestHeaders
  ) =>
    API.get<{ employers: Employer[]; count: number }>(
      `/admin/employers?page=${data.page}&limit=${data.limit}&filter=${data.filter}`,
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
