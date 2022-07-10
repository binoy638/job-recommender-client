import type { JobWithPopulatedFields } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import GeneralAPI from '@/API/generalAPI';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/search/SearchBar';
import Layout from '@/layouts/BasicLayout';
import { Utils } from '@/utils';

interface JobsProps {
  jobs: JobWithPopulatedFields[];
}

const Jobs = ({ jobs }: JobsProps) => {
  return (
    <main className="flex flex-col gap-4">
      <SearchBar />
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  try {
    const {
      data: { jobs },
    } = await GeneralAPI.getJobs(Number(page));

    return {
      props: {
        jobs,
      },
    };
  } catch (error) {
    console.log(error);
    return Utils.redirect('/500');
  }
};

Jobs.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Jobs;
