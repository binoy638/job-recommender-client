import { Text } from '@mantine/core';
import type { ReactElement } from 'react';
import React from 'react';

import NotVerifiedAlert from '@/components/employer/dashboard/NotVerifiedAlert';
import Layout from '@/layouts/BasicLayout';

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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const cookies = req.headers.cookie;
//   if (!cookies) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }
//   try {
//     const employers = await AdminAPI.getEmployers(
//       req.headers as AxiosRequestHeaders
//     );
//     return {
//       props: {
//         employers,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/500",
//         permanent: false,
//       },
//     };
//   }
// };

EmployerDashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerDashboard;
