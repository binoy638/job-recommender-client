import { Table } from '@mantine/core';
import type { JobSeekerJobApplication } from '@types';
import React from 'react';

import { Utils } from '@/utils';

interface ApplicationListProps {
  applications: JobSeekerJobApplication[];
}

const ApplicationList = ({ applications }: ApplicationListProps) => {
  const rows = applications.map((application) => (
    <tr key={application.id}>
      <td>{application.job.employer.company.name}</td>
      <td>{application.job.jobTitle}</td>
      <td>{Utils.formatDate(application.createdAt)}</td>
      <td>{application.job.applications?.length || 0}</td>
      <td>{application.status}</td>
    </tr>
  ));
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Applied ON</th>
            <th>NUMBER OF APPLICANTS</th>
            <th>APPLICATION STATUS</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default ApplicationList;
