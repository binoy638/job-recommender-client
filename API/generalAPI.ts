import { API } from './config';

export const getSkills = () => API.get('/skills');
export const getJobCategories = () => API.get('/job-categories');
