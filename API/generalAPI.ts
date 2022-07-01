import type { City, Country, JobCategories, State } from '@types';

import { API } from './config';

class GeneralAPI {
  static searchSkills = (q: string) =>
    API.get<{ name: string; _id: string }[]>(`/skills?q=${q}`);

  static getJobCategories = () => API.get<JobCategories[]>('/job-categories');

  static getCountries = () => API.get<{ countries: Country[] }>('/countries');

  static getStates = (countryID: number) =>
    API.get<{ states: State[] }>(`/states/${countryID}`);

  static getCities = (stateID: number) =>
    API.get<{ cities: City[] }>(`/cities/${stateID}`);
}

export default GeneralAPI;
