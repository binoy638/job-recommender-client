import { Button } from '@mantine/core';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';

import Layout from '@/layouts/Layout';

const SignIn = () => {
  return (
    <div className="flex gap-6">
      <Link href="/signin/employer" passHref>
        <Button>Employer</Button>
      </Link>
      <Link href="/signin/jobseeker" passHref>
        <Button>JobSeeker</Button>
      </Link>
    </div>
  );
};

SignIn.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SignIn;
