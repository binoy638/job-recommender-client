import type { EmployerJobApplication, Job } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { JobFormData } from 'schemas';

import { API } from './config';

export interface EmployerStatus {
  isVerified: boolean;
  isBanned: boolean;
}

class EmployerAPI {
  static status = (headers?: AxiosRequestHeaders) =>
    API.get<{ status: EmployerStatus }>('/employer/status', { headers });

  static updateProfile = async (data: any) =>
    API.put(`/employer/profile-update`, data);

  static getJobs = async (headers?: AxiosRequestHeaders) =>
    API.get<{ jobs: Job[] }>('/employer/jobs', { headers });

  static getJob = async (id: string, headers?: AxiosRequestHeaders) =>
    API.get(`/employer/job/${id}`, { headers });

  static addJob = async (data: JobFormData) => API.post('/employer/job', data);

  static updateJob = async (id: string, data: Partial<JobFormData>) =>
    API.put(`/employer/job/${id}`, data);

  static deleteJob = async (id: string, headers?: AxiosRequestHeaders) =>
    API.delete(`/employer/job/${id}`, { headers });

  static getJobApplications = async (
    id: number,
    headers?: AxiosRequestHeaders
  ) =>
    API.get<{ applications: EmployerJobApplication[] }>(
      `/employer/job/applications/${id}`,
      { headers }
    );
}

export default EmployerAPI;
