import { Paper } from '@mantine/core';
import type { FC } from 'react';
import React from 'react';

interface AuthContainerProps {
  children: React.ReactNode;
  className?: string;
}

const AuthContainer: FC<AuthContainerProps> = ({ children, className }) => {
  return (
    <main className={`lg:mx-72 ${className}`}>
      <Paper withBorder style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {children}
      </Paper>
    </main>
  );
};

export default AuthContainer;
