import { LogoutIcon, UserIcon, ViewGridIcon } from '@heroicons/react/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Header as HeaderMantine,
  MediaQuery,
  Menu,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { UserType } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React from 'react';
import { useTypedDispatch, useTypedSelector } from 'store';
import { clearUser } from 'store/slice/user.slice';

import AuthAPI from '@/API/authAPI';

interface HeaderProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu = ({ initial }: { initial: string }) => {
  const router = useRouter();

  const { user, type } = useTypedSelector((state) => state.user);

  const dispatch = useTypedDispatch();
  const handleLogout = () => {
    AuthAPI.signOut().then(() => {
      router.push('/');
      dispatch(clearUser());
    });
  };

  const handleProfile = () => {
    if (type === UserType.EMPLOYER) {
      router.push('/employer/profile');
    } else if (type === UserType.JOBSEEKER) {
      router.push(`/jobseeker/${user.id}`);
    }
  };

  const handleDashboard = () => {
    if (type === UserType.EMPLOYER) {
      router.push('/employer/dashboard');
    } else {
      router.push('/jobseeker/dashboard');
    }
  };

  return (
    <Menu
      control={
        <Avatar color="cyan" radius="xl">
          {initial}
        </Avatar>
      }
      trigger="hover"
    >
      <Menu.Item
        onClick={handleDashboard}
        icon={<ViewGridIcon className="h-5 w-5" />}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        onClick={handleProfile}
        icon={<UserIcon className="h-5 w-5" />}
      >
        {type === UserType.EMPLOYER ? 'Profile Edit' : 'Profile'}
      </Menu.Item>
      <Menu.Item
        onClick={handleLogout}
        icon={<LogoutIcon className="h-5 w-5" />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
};

const LogInMenu = () => {
  const router = useRouter();

  return (
    <Menu
      control={<Text style={{ cursor: 'pointer' }}>Log In</Text>}
      trigger="hover"
    >
      <Menu.Item
        onClick={() => {
          router.push('/signin/employer');
        }}
      >
        Employer
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          router.push('/signin/jobseeker');
        }}
      >
        Job Seeker
      </Menu.Item>
    </Menu>
  );
};

const AuthSection = () => {
  const { user, type } = useTypedSelector((state) => state.user);
  if (!user || type === UserType.ADMIN || !type) {
    return (
      <>
        <LogInMenu />
        <Link href={'/signup'}>
          <Button radius={'xl'} color="green">
            Sign Up
          </Button>
        </Link>
      </>
    );
  }

  return (
    <span className="flex cursor-pointer items-center justify-center">
      <ProfileMenu initial={`${user.firstName[0]}${user.lastName[0]}`} />
    </span>
  );
};

const RightSection: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <div className="flex  h-full w-full  justify-between ">
      <Link href={'/'}>
        <span className="cursor-pointer text-2xl  font-bold text-green-600   hover:opacity-90">
          JobFinder
        </span>
      </Link>
      <div className="flex items-center justify-center gap-6">
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? (
            <SunIcon style={{ height: '20px', width: '20x' }} />
          ) : (
            <MoonIcon color="black" style={{ height: '20px', width: '20x' }} />
          )}
        </ActionIcon>
        <AuthSection />
      </div>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  return (
    <HeaderMantine
      height={60}
      color="red"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div className="flex w-full max-w-[65rem] items-center justify-center px-4 lg:px-0">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            color={theme.colors.gray[6]}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <RightSection />
      </div>
    </HeaderMantine>
  );
};

export default Header;
