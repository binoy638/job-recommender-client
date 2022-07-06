import type { JobSeeker, JobSeekerJobApplication } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

class JobSeekerAPI {
  static getProfile = async (id: number) =>
    API.get<{ profile: JobSeeker }>(`/jobseeker/profile/${id}`);

  static updateProfile = async (data: any) =>
    API.put(`/jobseeker/profile`, data);

  static getApplications = async (headers?: AxiosRequestHeaders) =>
    API.get<{ applications: JobSeekerJobApplication[] }>(
      `/jobseeker/applications`,
      {
        headers,
      }
    );

  static postApplication = async (data: { job: string }) =>
    API.post(`/jobseeker/application`, data);
}

export default JobSeekerAPI;
