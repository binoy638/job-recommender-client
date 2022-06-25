import { Button, Divider, Paper, Text } from '@mantine/core';
import type { ReactElement } from 'react';
import React from 'react';

import SignInForm from '@/components/forms/SignInForm';
import Layout from '@/layouts/Layout';

const Signin = () => {
  return (
    <div className="lg:mx-72">
      <Paper withBorder style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="mb-20 flex flex-col items-center justify-center px-4 lg:px-20">
          <span className="mb-6 text-2xl">Log in to JobFinder</span>
          <SignInForm />
        </div>
        <Divider mt={30} />
        <div className="mt-6  flex flex-col items-center justify-center gap-6 px-4 lg:px-20">
          <Text color={'gray'} size="sm">
            Don&apos;t have an account?
          </Text>
          <Button radius={'lg'} variant="outline" color={'green'} fullWidth>
            Sign Up
          </Button>
        </div>
      </Paper>
    </div>
  );
};

Signin.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Signin;
