import type { JobSeeker } from '@types';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import JobSeekerAPI from '@/API/JobSeekerAPI';
import Layout from '@/layouts/BasicLayout';
import { Utils } from '@/utils';

const Resume = ({ profile }: { profile: JobSeeker }) => {
  return <div>{profile.firstName}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as unknown as number;
  try {
    const {
      data: { profile },
    } = await JobSeekerAPI.getProfile(id);

    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    console.log(error);
    return Utils.redirect('/404');
  }
};
Resume.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Resume;
