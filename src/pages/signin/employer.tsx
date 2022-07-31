import { Button, Divider, Text } from '@mantine/core';
import { UserType } from '@types';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';

import SignInForm from '@/components/forms/SignInForm';
import AuthContainer from '@/components/UI/AuthContainer';
import Layout from '@/layouts/BasicLayout';

const EmployerSignIn = () => {
  return (
    <AuthContainer>
      <div className="mb-20 flex flex-col items-center justify-center px-4 lg:px-20">
        <span className="mb-6 font-Rza text-2xl">Log in as Employer</span>

        <SignInForm userType={UserType.EMPLOYER} />
      </div>
      <Divider mt={30} />
      <div className="mt-6  flex flex-col items-center justify-center gap-6 px-4 lg:px-20">
        <Text color={'gray'} size="sm">
          Don&apos;t have an account?
        </Text>
        <Link href="/signup/employer" passHref>
          <Button radius={'lg'} variant="outline" color={'green'} fullWidth>
            Sign Up
          </Button>
        </Link>
      </div>
    </AuthContainer>
  );
};
EmployerSignIn.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerSignIn;
