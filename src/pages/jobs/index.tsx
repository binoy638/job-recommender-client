import { Pagination } from '@mantine/core';
import type { JobWithPopulatedFields } from '@types';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/search/SearchBar';
import Layout from '@/layouts/BasicLayout';
import { Utils } from '@/utils';

interface JobsProps {
  jobs: JobWithPopulatedFields[];
  count: number;
}

const Jobs = ({ jobs, count }: JobsProps) => {
  const [activePage, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    router.push({
      pathname: router.pathname,
      query: { page: activePage },
    });
  }, [activePage]);

  return (
    <main className="flex flex-col  gap-4">
      <SearchBar />
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
      <div className="mt-4 flex items-center justify-center">
        <Pagination
          page={activePage}
          onChange={setPage}
          total={Math.ceil(count / 10)}
          color="teal"
        />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  try {
    const {
      data: { jobs, count },
    } = await GeneralAPI.getJobs(Number(page));

    return {
      props: {
        jobs,
        count,
      },
    };
  } catch (error) {
    console.log(error);
    return Utils.redirect('/500');
  }
};

Jobs.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Jobs;
