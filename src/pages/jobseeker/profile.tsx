import { Paper } from '@mantine/core';
import type { JobSeeker } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import AuthAPI from '@/API/authAPI';
import JobSeekerProfileEditForm from '@/components/forms/JobSeekerProfileEditForm';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

const Profile = ({ user }: { user: JobSeeker }) => {
  return (
    <Paper withBorder p={20}>
      <JobSeekerProfileEditForm user={user} />
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.JOBSEEKER,
  async ({ req }) => {
    try {
      const headers = req.headers as AxiosRequestHeaders;

      const {
        data: { user },
      } = await AuthAPI.getLoggedInUser(headers);

      return {
        props: {
          user,
        },
      };
    } catch (error) {
      console.log(error);
      return Utils.redirect('/500');
    }
  }
);

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Profile;
