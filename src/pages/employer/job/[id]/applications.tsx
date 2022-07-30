import { Tabs } from '@mantine/core';
import type { EmployerJobApplication } from '@types';
import { ApplicationStatus, UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import console from 'console';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React from 'react';

import ApplicationCardList from '@/components/job/ApplicationCardList';
import useFetchJobApplications, {
  fetchJobApplications,
} from '@/hooks/useFetchJobApplications';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

interface Props {
  pending: EmployerJobApplication[];
  shortlisted: EmployerJobApplication[];
  hired: EmployerJobApplication[];
  rejected: EmployerJobApplication[];
}

const Applications = ({ pending, shortlisted, hired, rejected }: Props) => {
  const router = useRouter();

  const id = router.query.id as unknown as number;

  const { data } = useFetchJobApplications(id, {
    pending,
    shortlisted,
    hired,
    rejected,
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <Tabs color="blue" grow>
        <Tabs.Tab label={`Pending(${data.pending.length})`}>
          <ApplicationCardList
            jobID={id}
            applications={data.pending}
            type={ApplicationStatus.PENDING}
          />
        </Tabs.Tab>
        <Tabs.Tab label={`Shortlisted(${data.shortlisted.length})`}>
          <ApplicationCardList
            jobID={id}
            applications={data.shortlisted}
            type={ApplicationStatus.SHORTLISTED}
          />
        </Tabs.Tab>
        <Tabs.Tab label={`Selected(${data.hired.length})`}>
          <ApplicationCardList
            jobID={id}
            applications={data.hired}
            type={ApplicationStatus.APPROVED}
          />
        </Tabs.Tab>
        <Tabs.Tab label={`Rejected(${data.rejected.length})`}>
          <ApplicationCardList
            jobID={id}
            applications={data.rejected}
            type={ApplicationStatus.REJECTED}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async ({ req, params }) => {
    const id = params?.id as unknown as number;
    const headers = req.headers as AxiosRequestHeaders;
    try {
      const applications = await fetchJobApplications(id, headers);

      return {
        props: {
          ...applications,
        },
      };
    } catch (error) {
      console.log(error);
      return Utils.redirect('/404');
    }
  }
);

Applications.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Applications;
