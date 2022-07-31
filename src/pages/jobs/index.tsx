import { ExclamationIcon } from '@heroicons/react/outline';
import { Alert, Pagination, Text } from '@mantine/core';
import type { JobWithPopulatedFields } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { useTypedSelector } from 'store';

import GeneralAPI from '@/API/generalAPI';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/search/SearchBar';
import Layout from '@/layouts/BasicLayout';
import { Utils } from '@/utils';

interface JobsProps {
  jobs: JobWithPopulatedFields[];
  count: number;
}

const Heading = ({ count }: { count: number }) => {
  const { type } = useTypedSelector((state) => state.user);

  if (type === UserType.JOBSEEKER) {
    return (
      <div className="flex justify-between">
        <Text weight={'bold'}>
          Job recommendations based on your preferences
        </Text>
        <Text weight={'bold'}>{count} jobs found</Text>
      </div>
    );
  }
  return <Text weight={'bold'}>{count} Jobs Available</Text>;
};

interface JobListContainerProps {
  jobs: JobWithPopulatedFields[];
  count: number;
  page: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
  NotFoundError: string;
}

export const JobListContainer = ({
  jobs,
  count,
  page,
  onChangePage,
  NotFoundError,
}: JobListContainerProps) => {
  return (
    <main className="flex flex-col  gap-4">
      <SearchBar />
      {jobs.length > 0 ? (
        <>
          <Heading count={count} />
          {jobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              page={page}
              onChange={onChangePage}
              total={Math.ceil(count / 20)}
              color="teal"
            />
          </div>
        </>
      ) : (
        <Alert
          icon={<ExclamationIcon className="h-5 w-5" />}
          title="Not Found!"
          color="red"
        >
          {NotFoundError}
        </Alert>
      )}
    </main>
  );
};

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
    <JobListContainer
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
