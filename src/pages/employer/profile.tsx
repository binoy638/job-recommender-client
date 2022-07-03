import { Paper } from '@mantine/core';
import type { Employer } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import AuthAPI from '@/API/authAPI';
import EmployerProfileEditForm from '@/components/forms/EmployerProfileEditForm';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

const Profile = ({ user }: { user: Employer }) => {
  return (
    <Paper withBorder p={20}>
      <EmployerProfileEditForm user={user} />
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
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
