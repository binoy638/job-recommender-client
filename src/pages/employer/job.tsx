import { Paper } from '@mantine/core';
import type { JobCategories } from '@types';
import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import GeneralAPI from '@/API/generalAPI';
import JobCreateForm from '@/components/employer/job/forms/JobCreateForm';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

const Job = ({ categories }: { categories: JobCategories[] }) => {
  return (
    <main className={`lg:mx-40 `}>
      <Paper withBorder style={{ padding: '2rem' }}>
        <JobCreateForm categories={categories} />
      </Paper>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async () => {
    try {
      const { data } = await GeneralAPI.getJobCategories();
      return {
        props: { categories: data },
      };
    } catch (error) {
      return Utils.redirect('/500');
    }
  }
);

Job.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Job;
