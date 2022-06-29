import { XCircleIcon } from '@heroicons/react/outline';
import { Text } from '@mantine/core';
import React from 'react';

import AdminPanelLayout from '@/layouts/AdminLayout';

const test = () => {
  return (
    <AdminPanelLayout>
      <div>
        <div className="flex flex-col items-center justify-center gap-4">
          <XCircleIcon className="h-28 w-28 text-red-500" />
          <Text>Oh no, something went wrong.</Text>
        </div>
      </div>
    </AdminPanelLayout>
  );
};

export default test;
