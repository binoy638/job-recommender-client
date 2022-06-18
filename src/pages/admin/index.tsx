import type { ReactElement } from 'react';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import type { NextPageWithLayout } from '../_app';

const AdminDashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

AdminDashboard.getLayout = (page: ReactElement) => (
  <AdminPanelLayout>{page}</AdminPanelLayout>
);

export default AdminDashboard;
