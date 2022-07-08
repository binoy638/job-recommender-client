import type { EmployerJobApplication } from '@types';
import { ApplicationStatus } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import { useQuery } from 'react-query';

import EmployerAPI from '@/API/EmployerAPI';

export const fetchJobApplications = async (
  id: number,
  headers?: AxiosRequestHeaders
) => {
  const {
    data: { applications },
  } = await EmployerAPI.getJobApplications(id, headers);

  const pending: EmployerJobApplication[] = [];
  const shortlisted: EmployerJobApplication[] = [];
  const hired: EmployerJobApplication[] = [];
  const rejected: EmployerJobApplication[] = [];

  applications.forEach((application) => {
    if (application.status === ApplicationStatus.PENDING) {
      pending.push(application);
    }
    if (application.status === ApplicationStatus.SHORTLISTED) {
      shortlisted.push(application);
    }
    if (application.status === ApplicationStatus.APPROVED) {
      hired.push(application);
    }
    if (application.status === ApplicationStatus.REJECTED) {
      rejected.push(application);
    }
  });

  return {
    pending,
    shortlisted,
    hired,
    rejected,
  };
};

const useFetchJobApplications = (
  id: number,
  initialData: {
    pending: EmployerJobApplication[];
    shortlisted: EmployerJobApplication[];
    hired: EmployerJobApplication[];
    rejected: EmployerJobApplication[];
  }
) => {
  return useQuery(
    ['job-applications', id],
    async () => {
      const applications = await fetchJobApplications(id);
      return applications;
    },
    { initialData }
  );
};

export default useFetchJobApplications;
