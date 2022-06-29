import type { ReactElement } from 'react';

import Layout from '@/layouts/BasicLayout';

import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  // const router = useRouter();

  return <main>Hello</main>;
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
