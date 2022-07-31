import type { JobWithPopulatedFields } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';
import JobListingContainer from '@/components/job/JobListingContainer';
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
    <JobListingContainer
      jobs={jobs}
      count={count}
      page={activePage}
      onChangePage={setPage}
      NotFoundError="No matching job found for your profile."
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const page = query.page || 1;
  const headers = req.headers as AxiosRequestHeaders;
  try {
    const {
      data: { jobs, count },
    } = await GeneralAPI.getJobs(Number(page), headers);

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
