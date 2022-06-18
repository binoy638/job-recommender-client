import { HomeIcon, UserIcon } from '@heroicons/react/solid';
import {
  AppShell,
  Avatar,
  Burger,
  Header as HeaderComp,
  MediaQuery,
  Navbar,
} from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import React, { useState } from 'react';

interface MenuItemProps {
  name: string;
  route: string;
  icon: JSX.Element;
}
const MenuItem: FC<MenuItemProps> = ({ name, icon, route }) => {
  return (
    <Link href={route}>
      <div className="flex cursor-pointer gap-2">
        {icon}
        <span>{name}</span>
      </div>
    </Link>
  );
};

interface SidebarProps {
  show: boolean;
}
const Sidebar: FC<SidebarProps> = ({ show }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!show}
      width={{ sm: 200, lg: 230 }}
      style={{
        gap: '1rem',
      }}
    >
      <MenuItem
        name="Dashboard"
        route="/admin"
        icon={<HomeIcon className="h-5 w-5" />}
      />

      <MenuItem
        name="Employers"
        route="/admin/employers"
        icon={<HomeIcon className="h-5 w-5" />}
      />
      <MenuItem
        name="Categories"
        route="/admin/categories"
        icon={<HomeIcon className="h-5 w-5" />}
      />
      <MenuItem
        name="Skills"
        route="/admin/skills"
        icon={<HomeIcon className="h-5 w-5" />}
      />
    </Navbar>
  );
};

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  return (
    <HeaderComp height={60} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            // color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div className="flex  h-full w-full  justify-between ">
          <Link href={'/'}>
            <span className="cursor-pointer   text-2xl font-bold  hover:opacity-75">
              JobFinder
            </span>
          </Link>
          <span className="flex cursor-pointer items-center justify-center">
            <Avatar color="cyan" radius="xl">
              <UserIcon className="h-5 w-5" />
            </Avatar>
          </span>
        </div>
        {/* <Text className="font-balsamiqSans">Application header</Text> */}
      </div>
    </HeaderComp>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const AdminPanelLayout: FC<LayoutProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="md"
      fixed
      navbar={<Sidebar show={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
};

export default AdminPanelLayout;
