import type { EmployerAttrs } from '@types';
import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

export const addSkills = () => console.log('yo');

export const getEmployers = (headers?: AxiosRequestHeaders) => {
  if (headers) {
    return API.get<EmployerAttrs[]>('/admin/employers', {
      headers,
    });
  }
  return API.get<EmployerAttrs[]>('/admin/employers');
};
