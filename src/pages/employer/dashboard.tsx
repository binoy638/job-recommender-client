import { Text } from '@mantine/core';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import type { EmployerStatus } from '@/API/EmployerAPI';
import EmployerAPI from '@/API/EmployerAPI';
import NotVerifiedAlert from '@/components/employer/dashboard/NotVerifiedAlert';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication } from '@/utils';

const EmployerDashboard = ({ status }: { status: EmployerStatus }) => {
  return (
    <main>
      <Text weight={'bold'} size={'xl'}>
        Dashboard
      </Text>
      <div className="mt-4">
        {status.isVerified ? <div>Welcome</div> : <NotVerifiedAlert />}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async ({ req }) => {
    const { data } = await EmployerAPI.status(
      req.headers as AxiosRequestHeaders
    );
    return {
      props: {
        status: data.status,
      },
    };
  }
);

EmployerDashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerDashboard;
