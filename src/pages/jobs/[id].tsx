import type { JobWithPopulatedFields } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import GeneralAPI from '@/API/generalAPI';
import JobDetails from '@/components/employer/job/JobDetails';
import Layout from '@/layouts/BasicLayout';
import { Utils } from '@/utils';

interface JobProps {
  job: JobWithPopulatedFields;
}
const Job = ({ job }: JobProps) => {
  return <JobDetails job={job} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as unknown as number;
  try {
    const {
      data: { job },
    } = await GeneralAPI.getJob(id);

    return {
      props: {
        job,
      },
    };
  } catch (error) {
    console.log(error);
    return Utils.redirect('/404');
  }
};

Job.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Job;
