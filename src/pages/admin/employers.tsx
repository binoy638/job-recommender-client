import type { ReactElement } from 'react';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import type { NextPageWithLayout } from '../_app';

const AdminEmployer: NextPageWithLayout = () => {
  return <div>Employers</div>;
};

AdminEmployer.getLayout = (page: ReactElement) => (
  <AdminPanelLayout>{page}</AdminPanelLayout>
);

export default AdminEmployer;
