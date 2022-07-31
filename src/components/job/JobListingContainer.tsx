import { ExclamationIcon } from '@heroicons/react/outline';
import { Alert, Pagination, Paper, Text } from '@mantine/core';
import type { JobWithPopulatedFields } from '@types';
import { UserType } from '@types';
import { useTypedSelector } from 'store';

import SearchBar from '../search/SearchBar';
import JobCard from './JobCard';

interface JobListContainerProps {
  jobs: JobWithPopulatedFields[];
  count: number;
  page: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
  NotFoundError: string;
}

const Heading = ({ count }: { count: number }) => {
  const { type } = useTypedSelector((state) => state.user);

  if (type === UserType.JOBSEEKER) {
    return (
      <div className="mb-1 flex justify-end">
        <Text size="xs">{count} jobs found based on your preferences</Text>
      </div>
    );
  }
  return (
    <Text size="xs" align="right" mb={5}>
      {count} Jobs Available
    </Text>
  );
};

const JobListingContainer = ({
  jobs,
  count,
  page,
  onChangePage,
  NotFoundError,
}: JobListContainerProps) => {
  return (
    <>
      <Heading count={count} />

      <Paper withBorder radius={'lg'}>
        <Paper
          mt={10}
          sx={(theme) => ({
            borderBottom: `2px solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
            }`,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          })}
          p={20}
        >
          <SearchBar />
        </Paper>
        {jobs.length > 0 ? (
          <>
            {jobs.map((job) => {
              return <JobCard key={job.id} job={job} />;
            })}
            <div className="flex items-center justify-center py-6">
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
      </Paper>
    </>
  );
};

export default JobListingContainer;
