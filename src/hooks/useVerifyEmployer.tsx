import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import AdminAPI from '@/API/adminAPI';

const useVerifyEmployer = (invalidateQuery: string | string[]) => {
  const queryClient = useQueryClient();

  return useMutation(AdminAPI.verifyEmployer, {
    onSuccess: () => {
      showNotification({
        message: 'Verified Successfully',
        color: 'teal',
        icon: <CheckIcon className="h-5 w-5 " />,
      });
      queryClient.invalidateQueries(invalidateQuery);
    },
    onError: () => {
      showNotification({
        message: 'Oh no! Something went wrong',
        color: 'red',
        icon: <XIcon className="h-5 w-5 " />,
      });
    },
  });
};

export default useVerifyEmployer;
