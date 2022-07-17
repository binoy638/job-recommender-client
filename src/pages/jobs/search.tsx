import { Pagination, Skeleton } from '@mantine/core';
import type { JobSearchType } from '@types';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
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

  const [activePage, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ['search-jobs', query, type, page],
    async () => {
      const {
        data: { jobs, count },
      } = await GeneralAPI.searchJobs(
        query as string,
        page as number,
        type as JobSearchType
      );

      return { jobs, count };
    }
  );

  useEffect(() => {
    if (!router.isReady) return;
    router.push({
      pathname: router.pathname,
      query: { page: activePage, query, type },
    });
  }, [activePage]);

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
      {data.jobs.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
      <div className="mt-4 flex items-center justify-center">
        <Pagination
          page={activePage}
          onChange={setPage}
          total={Math.ceil(data.count / 10)}
          color="teal"
        />
      </div>
    </main>
  );
};

JobSearchPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default JobSearchPage;
