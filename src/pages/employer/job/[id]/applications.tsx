import { Tabs } from '@mantine/core';
import type { EmployerJobApplication } from '@types';
import { ApplicationStatus, UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import console from 'console';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import EmployerAPI from '@/API/EmployerAPI';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

interface Props {
  pending: EmployerJobApplication[];
  shortlisted: EmployerJobApplication[];
  hired: EmployerJobApplication[];
  rejected: EmployerJobApplication[];
}

const Applications = ({ pending, shortlisted, hired, rejected }: Props) => {
  return (
    <div>
      <Tabs color="blue" grow>
        <Tabs.Tab label={`Pending(${pending.length})`}></Tabs.Tab>
        <Tabs.Tab label={`Shortlisted(${shortlisted.length})`}></Tabs.Tab>
        <Tabs.Tab label={`Hired(${hired.length})`}></Tabs.Tab>
        <Tabs.Tab label={`Rejected(${rejected.length})`}></Tabs.Tab>
      </Tabs>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async ({ req, params }) => {
    const id = params?.id as unknown as number;
    const headers = req.headers as AxiosRequestHeaders;
    try {
      const {
        data: { applications },
      } = await EmployerAPI.getJobApplications(id, headers);

      const pending: EmployerJobApplication[] = [];
      const shortlisted: EmployerJobApplication[] = [];
      const hired: EmployerJobApplication[] = [];
      const rejected: EmployerJobApplication[] = [];

      applications.forEach((application) => {
        if (application.status === ApplicationStatus.PENDING) {
          pending.push(application);
        }
        if (application.status === ApplicationStatus.SHORTLISTED) {
          shortlisted.push(application);
        }
        if (application.status === ApplicationStatus.APPROVED) {
          hired.push(application);
        }
        if (application.status === ApplicationStatus.REJECTED) {
          rejected.push(application);
        }
      });

      return {
        props: {
          pending,
          shortlisted,
          hired,
          rejected,
        },
      };
    } catch (error) {
      console.log(error);
      return Utils.redirect('/404');
    }
  }
);

Applications.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Applications;
