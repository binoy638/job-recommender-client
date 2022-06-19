import type { JobCategories } from '@types';

import { API } from './config';

export const getSkills = () => API.get('/skills');
export const getJobCategories = async () => {
  const { data } = await API.get<JobCategories[]>('/job-categories');
  return data;
};
