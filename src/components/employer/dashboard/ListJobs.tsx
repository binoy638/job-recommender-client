import { Alert, Table, Text } from '@mantine/core';
import type { Job } from '@types';
import type { FC } from 'react';
import React from 'react';

import { Utils } from '@/utils';

interface ListJobsProps {
  jobs: Job[];
}

const ListJobs: FC<ListJobsProps> = ({ jobs }) => {
  const rows = jobs.map((job) => (
    <tr key={job.id}>
      <td>{Utils.formatDate(job.createdAt)}</td>
      <td>{job.jobTitle}</td>
      <td>{job.status ? 'Active' : 'Closed'}</td>
      <td>4</td>
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