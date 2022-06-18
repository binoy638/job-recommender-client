import type { AxiosRequestHeaders } from 'axios';

import { API } from './config';

export const addSkills = () => console.log('yo');

export const getEmployers = (headers: AxiosRequestHeaders) =>
  API.get('/admin/employers', { headers });
