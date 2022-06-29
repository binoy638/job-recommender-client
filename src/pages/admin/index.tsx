import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import AdminLayout from '@/layouts/AdminLayout';
import { requireAdminAuthentication } from '@/utils';

import type { NextPageWithLayout } from '../_app';

const AdminDashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

export const getServerSideProps: GetServerSideProps =
  requireAdminAuthentication(async () => {
    return {
      props: {},
    };
  });

AdminDashboard.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminDashboard;
