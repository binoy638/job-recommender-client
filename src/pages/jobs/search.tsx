import { Skeleton } from '@mantine/core';
import type { JobSearchType } from '@types';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React from 'react';
import { useQuery } from 'react-query';

import GeneralAPI from '@/API/generalAPI';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/search/SearchBar';
import Layout from '@/layouts/BasicLayout';

const JobSearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const { type } = router.query;
  const page = router.query.page || 1;

  const { data, isLoading, isError } = useQuery(
    ['search-jobs', query, type, page],
    async () => {
      const {
        data: { jobs },
      } = await GeneralAPI.searchJobs(
        query as string,
        page as number,
        type as JobSearchType
      );

      return jobs;
    }
  );

  if (isLoading) {
    return (
      <main className="flex flex-col gap-4">
        <SearchBar />
        {Array.from(Array(10).keys()).map((val) => {
          return <Skeleton key={val} height={170} />;
        })}
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex flex-col gap-4">
        <SearchBar />
        <div>Something went wrong</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-4">
      <SearchBar />
      {data.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
    </main>
  );
};

JobSearchPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default JobSearchPage;
