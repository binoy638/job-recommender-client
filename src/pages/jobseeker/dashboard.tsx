import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Alert, Button } from '@mantine/core';
import type { JobApplication } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';

import JobSeekerAPI from '@/API/JobSeekerAPI';
import ContainerWithHeader from '@/components/UI/ContainerWithHeader';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

interface JobSeekerDashboardProps {
  applications: JobApplication[];
}

const EmployerDashboard = ({ applications }: JobSeekerDashboardProps) => {
  if (applications.length === 0) {
    return (
      <ContainerWithHeader header="Dashboard">
        <Alert icon={<ExclamationCircleIcon />} title="Bummer!" color="red">
          <span>You have not applied to any jobs yet</span>
        </Alert>
        <Link href="/jobs" passHref>
          <Button mt={20} variant="outline" color="green">
            Browse Jobs
          </Button>
        </Link>
      </ContainerWithHeader>
    );
  }

  return (
    <ContainerWithHeader header="Dashboard">
      <div>Have applications</div>
    </ContainerWithHeader>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.JOBSEEKER,
  async ({ req }) => {
    try {
      const headers = req.headers as AxiosRequestHeaders;

      const {
        data: { applications },
      } = await JobSeekerAPI.getApplications(headers);

      return {
        props: {
          applications,
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
