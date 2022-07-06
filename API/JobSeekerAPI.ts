import type { JobApplication } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

class JobSeekerAPI {
  static updateProfile = async (data: any) =>
    API.put(`/jobseeker/profile-update`, data);

  static getApplications = async (headers?: AxiosRequestHeaders) =>
    API.get<{ applications: JobApplication[] }>(`/jobseeker/applications`, {
      headers,
    });

  static postApplication = async (data: { job: string }) =>
    API.post(`/jobseeker/application`, data);
}

export default JobSeekerAPI;
