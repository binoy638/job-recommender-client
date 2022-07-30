import {
  CubeIcon,
  ExclamationCircleIcon,
  OfficeBuildingIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { Alert, Divider, Paper, Text } from '@mantine/core';
import type {
  Employer,
  EmployerJobApplication,
  JobWithPopulatedFields,
} from '@types';
import { ApplicationStatus, UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import AdminAPI from '@/API/adminAPI';
import AdminLayout from '@/layouts/AdminLayout';
import { requireAuthentication, Utils } from '@/utils';

const DataRow = ({
  title,
  data,
  className = '',
}: {
  title: string;
  data: string;
  className?: string;
}) => {
  return (
    <div>
      <span className="font-bold">{title}:</span>{' '}
      <span className={className}>{data}</span>
    </div>
  );
};

const Header = ({ title, icon }: { title: string; icon: JSX.Element }) => {
  return (
    <div className="flex items-center  gap-1">
      {icon}
      <Text size="xl" weight="bolder">
        {title}
      </Text>
    </div>
  );
};

const getApplicationCount = (applications: EmployerJobApplication[]) => {
  const result = {
    total: applications.length,
    pending: 0,
    shortlisted: 0,
    accepted: 0,
    rejected: 0,
  };
  applications.forEach((application) => {
    if (application.status === ApplicationStatus.PENDING) {
      result.pending += 1;
    } else if (application.status === ApplicationStatus.APPROVED) {
      result.accepted += 1;
    } else if (application.status === ApplicationStatus.REJECTED) {
      result.rejected += 1;
    } else if (application.status === ApplicationStatus.SHORTLISTED) {
      result.shortlisted += 1;
    }
  });

  return result;
};

const JobDetails = ({ job }: { job: JobWithPopulatedFields }) => {
  const { total, pending, accepted, rejected, shortlisted } =
    getApplicationCount(job.applications);

  return (
    <Paper
      withBorder
      p={20}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Text size="lg" weight={'bolder'}>
        {job.jobTitle}
      </Text>
      <Text size="sm" color={job.isActive ? 'green' : 'red'}>
        {job.isActive ? 'Active' : 'Not Active'}
      </Text>
      <div className="flex gap-4">
        <Text>Created On: {Utils.formatDate(job.createdAt)}</Text>
        <Text>Start Date: {Utils.formatDate(job.startDate)}</Text>
        <Text>Apply By: {Utils.formatDate(job.applyBy)}</Text>
      </div>

      <Text weight={'bold'}>Applications Status</Text>
      <div className="flex gap-4">
        <div>Total: {total}</div>
        <div>Pending: {pending}</div>
        <div>Shortlisted: {shortlisted}</div>
        <div>Accepted: {accepted}</div>
        <div>Rejected: {rejected}</div>
      </div>
    </Paper>
  );
};

const EmployerDetails = ({
  employer,
  jobs,
}: {
  employer: Employer;
  jobs: JobWithPopulatedFields[];
}) => {
  return (
    <Paper withBorder shadow="xs" p={20}>
      <div className="flex flex-col gap-4">
        <div>
          <Header
            title="Employer Account Details"
            icon={<UserIcon className="h-5 w-5" />}
          />
          <div className="mt-4 flex flex-col gap-2">
            <DataRow
              title="Name"
              data={`${employer.firstName} ${employer.lastName}`}
            />
            <DataRow title="Email" data={employer.email} />
            <DataRow title="Phone" data={employer.phone} />
            <DataRow
              title="Joined on"
              data={Utils.formatWithTime(employer.createdAt)}
            />
            <DataRow
              title="Status"
              data={`${employer.isVerified ? 'Verified' : 'Not Verified'}`}
              className={`${
                employer.isVerified ? 'text-green-500' : 'text-red-500'
              }`}
            />
          </div>
        </div>
        <Divider my={10} />
        <div>
          <Header
            title="Employer Company Details"
            icon={<OfficeBuildingIcon className="h-5 w-5" />}
          />
          <div className="mt-4 flex flex-col gap-2">
            <DataRow title="Name" data={employer.company.name} />
            <DataRow title="Description" data={employer.company.description} />
            <DataRow
              title="Year Founded"
              data={employer.company.yearFounded.toString()}
            />
            {employer.company.employees && (
              <DataRow
                title="Employees"
                data={employer.company.employees.toString()}
              />
            )}
            <DataRow title="Website" data={employer.company.website} />
            <DataRow
              title="Address"
              data={Utils.formatLocation(employer.company.address)}
            />
          </div>
        </div>
        <Divider my={10} />
        <div>
          <Header title="Activity" icon={<CubeIcon className="h-5 w-5" />} />
          {jobs.length > 0 ? (
            <div>
              <Text weight={'bold'} my={10}>
                Posted Jobs
              </Text>
              {jobs.map((job) => {
                return <JobDetails job={job} key={job._id} />;
              })}
            </div>
          ) : (
            <Alert
              mt={20}
              icon={<ExclamationCircleIcon className="h-4 w-4" />}
              color="red"
            >
              No jobs posted yet
            </Alert>
          )}
        </div>
      </div>
    </Paper>
  );
};

EmployerDetails.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.ADMIN,
  async ({ params, req }) => {
    const id = params?.id as string;
    const headers = req.headers as AxiosRequestHeaders;
    try {
      const { data } = await AdminAPI.getEmployer(id, headers);
      return {
        props: {
          employer: data.employer,
          jobs: data.jobs,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      };
    }
  }
);

export default EmployerDetails;
