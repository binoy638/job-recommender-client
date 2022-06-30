import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication } from '@/utils';

import type { NextPageWithLayout } from '../_app';

const AdminSkills: NextPageWithLayout = () => {
  return <div>skills</div>;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async () => {
    return {
      props: {},
    };
  }
);

AdminSkills.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminSkills;
