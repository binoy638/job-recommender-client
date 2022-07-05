import { API } from './config';

class JobSeekerAPI {
  static updateProfile = async (data: any) =>
    API.put(`/jobseeker/profile-update`, data);
}

export default JobSeekerAPI;
