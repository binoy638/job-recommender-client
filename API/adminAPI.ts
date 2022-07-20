import type { Employer } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

class AdminAPI {
  static getEmployers = async (headers?: AxiosRequestHeaders) =>
    API.get<Employer[]>('/admin/employers', {
      headers,
    });

  static verifyEmployer = async (id: string) =>
    API.put(`/admin/employer/verify/${id}`);

  static addCategory = async (data: { name: string }) =>
    API.post('/admin/jobcategory', { name: data.name });

  static addSkills = async (name: string) =>
    API.post('/admin/skills', { name });
}

export default AdminAPI;
