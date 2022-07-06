import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { Button, Divider, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import type { JobSeeker } from '@types';
import React from 'react';
import { useMutation } from 'react-query';
import { EmployerProfileEdit } from 'schemas';

import JobSeekerAPI from '@/API/JobSeekerAPI';

const JobSeekerProfileEditForm = ({ user }: { user: JobSeeker }) => {
  const { mutate } = useMutation(JobSeekerAPI.updateProfile, {
    onSuccess: () => {
      showNotification({
        // title: 'Default notification',
        message: 'Profile Successfully Updated',
        color: 'teal',
        icon: <CheckIcon className="h-5 w-5 " />,
      });
    },
    onError: () => {
      showNotification({
        // title: 'Default notification',
        message: 'Oh no! Something went wrong',
        color: 'red',
        icon: <XIcon className="h-5 w-5 " />,
      });
    },
  });

  const form = useForm({
    schema: zodResolver(EmployerProfileEdit),
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const formattedData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    };
    mutate(formattedData);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <div>
        <Text size="lg" weight="bolder">
          Account Info
        </Text>
      </div>
      <div className="flex gap-2">
        <TextInput
          style={{ width: '100%' }}
          {...form.getInputProps('firstName')}
          label="First Name"
          required
        />
        <TextInput
          style={{ width: '100%' }}
          {...form.getInputProps('lastName')}
          label="Last Name"
          required
        />
      </div>
      <TextInput
        label="Email"
        {...form.getInputProps('email')}
        defaultValue={user.email}
        disabled
      />
      <TextInput
        label="Phone Number"
        {...form.getInputProps('phone')}
        required
      />
      <Divider />

      <Button type="submit" color="green">
        Update
      </Button>
    </form>
  );
};

export default JobSeekerProfileEditForm;
