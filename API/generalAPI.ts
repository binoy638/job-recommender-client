import type {
  City,
  Country,
  JobCategory,
  JobWithPopulatedFields,
  State,
} from '@types';

import { API } from './config';

class GeneralAPI {
  static searchSkills = (q: string) =>
    API.get<{ name: string; _id: string }[]>(`/skills?q=${q}`);

  static getJobs = (page: number) =>
    API.get<{ jobs: JobWithPopulatedFields[] }>(`/jobs?page=${page}`);

  static getJob = (id: number) =>
    API.get<{ job: JobWithPopulatedFields }>(`/job/${id}`);

  static getJobCategories = () => API.get<JobCategory[]>('/job-categories');

  static getCountries = () => API.get<{ countries: Country[] }>('/countries');

  static getStates = (countryID: number) =>
    API.get<{ states: State[] }>(`/states/${countryID}`);

  static getCities = (stateID: number) =>
    API.get<{ cities: City[] }>(`/cities/${stateID}`);
}

export default GeneralAPI;
