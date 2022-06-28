import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Alert } from '@mantine/core';
import React from 'react';

const NotVerifiedAlert = () => {
  return (
    <Alert icon={<ExclamationCircleIcon />} title="Bummer!" color="red">
      <span>Your account is not verified yet.</span>
      <span>You will be notified by us once your account is verified.</span>
    </Alert>
  );
};

export default NotVerifiedAlert;
