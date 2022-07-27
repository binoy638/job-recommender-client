import { AppShell } from '@mantine/core';
import Head from 'next/head';
import type { FC } from 'react';
import React, { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="md"
      fixed
      navbar={<Sidebar show={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Head>
        <title>JobFinder</title>
      </Head>
      {children}
    </AppShell>
  );
};

export default AdminLayout;
