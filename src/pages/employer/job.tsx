import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import Layout from '@/layouts/BasicLayout';
import { requireAuthentication } from '@/utils';

const Job = () => {
  return <div>job</div>;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async () => {
    return {
      props: {},
    };
  }
);

Job.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Job;
