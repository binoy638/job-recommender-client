import type { ReactElement } from 'react';

import AdminLayout from '@/layouts/AdminLayout';

import type { NextPageWithLayout } from '../_app';

const AdminDashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

AdminDashboard.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminDashboard;
