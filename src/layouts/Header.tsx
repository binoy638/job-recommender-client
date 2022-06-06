import { UserIcon } from '@heroicons/react/solid';
import {
  Avatar,
  Burger,
  Header as HeaderComp,
  MediaQuery,
} from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

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

export default Header;
