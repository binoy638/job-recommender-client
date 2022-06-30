import type { City, Country, JobCategories, State } from '@types';

import { API } from './config';

class GeneralAPI {
  static getSkills = () => API.get('/skills');

  static getJobCategories = () => API.get<JobCategories[]>('/job-categories');

  static getCountries = () => API.get<{ countries: Country[] }>('/countries');

  static getStates = (countryID: number) =>
    API.get<{ states: State[] }>(`/states/${countryID}`);

  static getCities = (stateID: number) =>
    API.get<{ cities: City[] }>(`/cities/${stateID}`);
}

export default GeneralAPI;
