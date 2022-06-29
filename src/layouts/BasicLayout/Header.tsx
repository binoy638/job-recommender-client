import { LogoutIcon } from '@heroicons/react/outline';
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
  const dispatch = useTypedDispatch();
  const handleLogout = () => {
    AuthAPI.signOut().then(() => {
      router.push('/');
      dispatch(clearUser());
    });
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
      <Menu.Label>Profile</Menu.Label>
      <Menu.Item
        onClick={handleLogout}
        icon={<LogoutIcon className="h-5 w-5" />}
      >
        Log out
      </Menu.Item>
      {/* <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />}>
        Transfer my data
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete my account
      </Menu.Item> */}
    </Menu>
  );
};

const AuthSection = () => {
  const { user, type } = useTypedSelector((state) => state.user);
  if (!user || type === UserType.ADMIN || !type) {
    return (
      <>
        <Link href={'/signin'} passHref>
          <Text style={{ cursor: 'pointer' }}>Log In</Text>
        </Link>
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
