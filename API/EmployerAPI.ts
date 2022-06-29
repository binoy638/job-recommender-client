import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

class EmployerAPI {
  static getJobs = async (headers?: AxiosRequestHeaders) =>
    API.get('/employer/jobs', { headers });

  static getJob = async (id: string, headers?: AxiosRequestHeaders) =>
    API.get(`/employer/job/${id}`, { headers });

  //! need typing for form data
  static addJob = async (data: any, headers?: AxiosRequestHeaders) =>
    API.post('/employer/job', data, { headers });

  static updateJob = async (
    id: string,
    data: any,
    headers?: AxiosRequestHeaders
  ) => API.put(`/employer/job/${id}`, data, { headers });

  static deleteJob = async (id: string, headers?: AxiosRequestHeaders) =>
    API.delete(`/employer/job/${id}`, { headers });
}

export default EmployerAPI;
