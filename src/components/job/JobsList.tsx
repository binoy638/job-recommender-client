import { Alert, Table, Text } from '@mantine/core';
import type { Job } from '@types';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import { Utils } from '@/utils';

interface ListJobsProps {
  jobs: Job[];
}

const getJobCount = (jobs: string[]): number => {
  if (!jobs) {
    return 0;
  }
  return jobs.length;
};

const ListJobs: FC<ListJobsProps> = ({ jobs }) => {
  const rows = jobs.map((job) => (
    <tr key={job.id}>
      <td>{Utils.formatDate(job.createdAt)}</td>
      <td>
        <Link href={`/employer/job/${job.id}`}>{job.jobTitle}</Link>
      </td>
      <td>{job.isActive ? 'Active' : 'Closed'}</td>
      <td>
        <Link href={`/employer/job/${job.id}/applications`} passHref>
          <a>{getJobCount(job.applications)}</a>
        </Link>
      </td>
      <td>{Utils.formatDate(job.applyBy)}</td>
    </tr>
  ));
  return (
    <div className="flex flex-col gap-4">
      <Alert color={'gray'}>
        <Text>Your Job Listings</Text>
      </Alert>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Applications</th>
            <th>Application Deadline</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default ListJobs;
