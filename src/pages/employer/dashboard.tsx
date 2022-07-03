import { Button } from '@mantine/core';
import type { Job } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';

import type { EmployerStatus } from '@/API/EmployerAPI';
import EmployerAPI from '@/API/EmployerAPI';
import NotVerifiedAlert from '@/components/employer/dashboard/NotVerifiedAlert';
import JobsList from '@/components/job/JobsList';
import ContainerWithHeader from '@/components/UI/ContainerWithHeader';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

interface EmployerDashboardProps {
  status: EmployerStatus;
  jobs: Job[];
}

const EmployerDashboard = ({ status, jobs }: EmployerDashboardProps) => {
  if (status.isVerified === false) {
    return (
      <ContainerWithHeader header="Dashboard">
        <NotVerifiedAlert />
      </ContainerWithHeader>
    );
  }

  return (
    <ContainerWithHeader header="Dashboard">
      {jobs.length > 0 ? (
        <JobsList jobs={jobs} />
      ) : (
        <div>
          No jobs found.
          <div>
            <Link href={'/employer/job/post'}>
              <Button>Create New Job</Button>
            </Link>
          </div>
        </div>
      )}
    </ContainerWithHeader>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async ({ req }) => {
    try {
      const headers = req.headers as AxiosRequestHeaders;

      const [
        {
          data: { status },
        },
        {
          data: { jobs },
        },
      ] = await Promise.all([
        EmployerAPI.status(headers),
        EmployerAPI.getJobs(headers),
      ]);

      return {
        props: {
          status,
          jobs,
        },
      };
    } catch (error) {
      console.log(error);
      return Utils.redirect('/500');
    }
  }
);

EmployerDashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerDashboard;
