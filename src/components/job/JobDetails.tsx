import { Paper, Text } from '@mantine/core';
import type { JobWithPopulatedFields } from '@types';
import React from 'react';

interface JobDetailsProps {
  job: JobWithPopulatedFields;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  return (
    <Paper withBorder p={20}>
      <div>
        <Text>{job.jobTitle}</Text>
      </div>
    </Paper>
  );
};

export default JobDetails;
