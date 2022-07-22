import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication, Utils } from '@/utils';

import type { NextPageWithLayout } from '../_app';

const AdminDashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async () => {
    return Utils.redirect('/admin/employers');
  }
);

AdminDashboard.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminDashboard;
