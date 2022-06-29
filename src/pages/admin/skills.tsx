import type { ReactElement } from 'react';

import AdminLayout from '@/layouts/AdminLayout';

import type { NextPageWithLayout } from '../_app';

const AdminSkills: NextPageWithLayout = () => {
  return <div>skills</div>;
};

AdminSkills.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminSkills;
