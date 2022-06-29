import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import AdminLayout from '@/layouts/AdminLayout';
import { requireAdminAuthentication } from '@/utils';

import type { NextPageWithLayout } from '../_app';

const AdminSkills: NextPageWithLayout = () => {
  return <div>skills</div>;
};

export const getServerSideProps: GetServerSideProps =
  requireAdminAuthentication(async () => {
    return {
      props: {},
    };
  });

AdminSkills.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminSkills;
