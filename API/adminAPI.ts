import type { Employer } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

class AdminAPI {
  public static getEmployers = async (headers?: AxiosRequestHeaders) =>
    API.get<Employer[]>('/admin/employers', {
      headers,
    });

  public static addCategory = async (
    data: { name: string },
    headers?: AxiosRequestHeaders
  ) =>
    API.post(
      '/admin/jobcategory',
      { name: data.name },
      {
        headers,
      }
    );
}

export default AdminAPI;
