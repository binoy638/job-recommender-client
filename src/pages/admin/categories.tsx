import type { ReactElement } from 'react';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import type { NextPageWithLayout } from '../_app';

const AdminJobCategories: NextPageWithLayout = () => {
  return <div>JobCategories</div>;
};

AdminJobCategories.getLayout = (page: ReactElement) => (
  <AdminPanelLayout>{page}</AdminPanelLayout>
);

export default AdminJobCategories;
