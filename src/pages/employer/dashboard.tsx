import { Text } from '@mantine/core';
import type { ReactElement } from 'react';
import React from 'react';

import NotVerifiedAlert from '@/components/employer/dashboard/NotVerifiedAlert';
import Layout from '@/layouts/Layout';

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
EmployerDashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default EmployerDashboard;
