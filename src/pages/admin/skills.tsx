import type { ReactElement } from 'react';

import AdminPanelLayout from '@/layouts/AdminPanelLayout';

import type { NextPageWithLayout } from '../_app';

const AdminSkills: NextPageWithLayout = () => {
  return <div>skills</div>;
};

AdminSkills.getLayout = (page: ReactElement) => (
  <AdminPanelLayout>{page}</AdminPanelLayout>
);

export default AdminSkills;
