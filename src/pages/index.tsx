import { Button, Text } from '@mantine/core';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';

import AuthAPI from '@/API/authAPI';
import Layout from '@/layouts/BasicLayout';
import { Utils } from '@/utils';

import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  // const router = useRouter();

  return (
    <main className="mt-10 flex flex-col items-center justify-center gap-10">
      <Text weight={700} style={{ fontSize: '2rem' }}>
        Find Your Dream Job Now
      </Text>
      <Link href="/jobs">
        <Button color="green" variant="outline">
          Browse Jobs
        </Button>
      </Link>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { data } = await AuthAPI.getLoggedInUser(
      req.headers as AxiosRequestHeaders
    );

    if (data.type === UserType.ADMIN) {
      return Utils.redirect('/admin/dashboard');
    }
    if (data.type === UserType.EMPLOYER) {
      return Utils.redirect('/employer/dashboard');
    }

    return Utils.redirect('/jobseeker/dashboard');
  } catch (error) {
    return {
      props: {},
    };
  }
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
