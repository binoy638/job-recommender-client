import { Text } from '@mantine/core';
import type { FC } from 'react';
import React from 'react';

interface ContainerWithHeaderProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

const ContainerWithHeader: FC<ContainerWithHeaderProps> = ({
  children,
  header,
}) => {
  return (
    <main className="flex flex-col gap-4">
      <Text weight={'bold'} size={'xl'}>
        {header}
      </Text>
      <div>{children}</div>
    </main>
  );
};

export default ContainerWithHeader;
