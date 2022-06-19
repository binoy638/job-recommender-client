import type { EmployerAttrs } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

export const addSkills = () => console.log('yo');

export const getEmployers = async (headers?: AxiosRequestHeaders) => {
  let api = API.get<EmployerAttrs[]>('/admin/employers');

  if (headers) {
    api = API.get<EmployerAttrs[]>('/admin/employers', {
      headers,
    });
  }
  const { data } = await api;
  return data;
};

export const addCategory = (name: string) =>
  API.post('/admin/jobcategory', {
    name,
  });
