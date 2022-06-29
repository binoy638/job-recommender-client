import type { JobCategories } from '@types';

import { API } from './config';

class GeneralAPI {
  static getSkills = () => API.get('/skills');

  static getJobCategories = () => API.get<JobCategories[]>('/job-categories');
}

export default GeneralAPI;
