import { HomeIcon } from '@heroicons/react/solid';
import { Navbar } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';

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

export default Sidebar;
