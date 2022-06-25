import { Button } from '@mantine/core';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';

import Layout from '@/layouts/Layout';

const SignUp = () => {
  return (
    <div className="flex gap-6">
      <Link href="/signup/employer" passHref>
        <Button>Employer</Button>
      </Link>
      <Link href="/signup/jobseeker" passHref>
        <Button>JobSeeker</Button>
      </Link>
    </div>
  );
};

SignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SignUp;
