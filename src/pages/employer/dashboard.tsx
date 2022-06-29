import { Text } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import NotVerifiedAlert from '@/components/employer/dashboard/NotVerifiedAlert';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication } from '@/utils';

const EmployerDashboard = () => {
  return (
    <main>
      <Text weight={'bold'} size={'xl'}>
        Dashboard
      </Text>
      <div className="mt-4">
        <NotVerifiedAlert />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    };
  }
);

EmployerDashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerDashboard;
