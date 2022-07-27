import type { Chat, JobSeeker, JobSeekerJobApplication } from '@types';
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

  static sendMessage = async (data: { chatID: string; message: string }) =>
    API.post(`/jobseeker/chat/send`, data);

  static markAsRead = async (data: { chatID: string }) =>
    API.put(`/jobseeker/chat/mark-as-read`, data);

  static getChat = async (headers?: AxiosRequestHeaders) =>
    API.get<{ chat: Chat[] }>(`/jobseeker/chat`, { headers });
}

export default JobSeekerAPI;
