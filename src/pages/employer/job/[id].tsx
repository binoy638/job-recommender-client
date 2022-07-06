import type { JobWithPopulatedFields } from '@types';
import { UserType } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import GeneralAPI from '@/API/generalAPI';
import JobDetails from '@/components/job/JobDetails';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

interface JobProps {
  job: JobWithPopulatedFields;
}
const Job = ({ job }: JobProps) => {
  return <JobDetails isEmployer={true} job={job} />;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async ({ params }) => {
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
  }
);

Job.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Job;
