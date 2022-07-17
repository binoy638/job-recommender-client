import type {
  City,
  Country,
  JobCategory,
  JobSearchType,
  JobWithPopulatedFields,
  Skill,
  State,
} from '@types';

import { API } from './config';

class GeneralAPI {
  static searchSkills = (q: string) =>
    API.get<{ name: string; _id: string }[]>(`/search/skills?q=${q}`);

  static searchJobs = (query: string, page: number, type: JobSearchType) =>
    API.get<{ jobs: JobWithPopulatedFields[]; count: number }>(
      `/search/jobs?query=${query}&page=${page}&type=${type}&limit=10`
    );

  static getSkills = (page: number, limit: number) =>
    API.get<{ skills: Skill[]; count: number }>(
      `/skills?page=${page}&limit=${limit}`
    );

  static getJobs = (page: number) =>
    API.get<{ jobs: JobWithPopulatedFields[]; count: number }>(
      `/jobs?page=${page}`
    );

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
