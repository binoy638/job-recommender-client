import { CheckIcon, XIcon } from '@heroicons/react/outline';
import {
  Button,
  Divider,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import type { Employer } from '@types';
import React from 'react';
import { useMutation } from 'react-query';
import { EmployerProfileEdit } from 'schemas';

import EmployerAPI from '@/API/EmployerAPI';

const EmployerProfileEditForm = ({ user }: { user: Employer }) => {
  const { mutate } = useMutation(EmployerAPI.updateProfile, {
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
      name: user.company.name,
      description: user.company.description,
      website: user.company.website,
      yearFounded: user.company.yearFounded,
      employees: user.company.employees,
      city: user.company.address.city,
      state: user.company.address.state,
      country: user.company.address.country,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const formattedData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      company: {
        name: values.name,
        description: values.description,
        website: values.website,
        yearFounded: values.yearFounded,
        employees: values.employees,
        address: {
          city: values.city,
          state: values.state,
          country: values.country,
        },
      },
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
      <div className="flex flex-col gap-4">
        <Text size="lg" weight="bolder">
          Company Info
        </Text>
        <TextInput
          label="Company Name"
          {...form.getInputProps('name')}
          required
        />
        <Textarea
          label="Description"
          {...form.getInputProps('description')}
          required
        />

        <NumberInput
          label="Year Founded"
          hideControls={true}
          {...form.getInputProps('yearFounded')}
          required
        />
        <NumberInput
          hideControls={true}
          label="Number of Employees"
          {...form.getInputProps('employees')}
        />
        <TextInput
          label="Website"
          {...form.getInputProps('website')}
          required
        />
        <TextInput
          disabled
          label="City"
          {...form.getInputProps('city')}
          required
        />
        <TextInput
          disabled
          label="State"
          {...form.getInputProps('state')}
          required
        />
        <TextInput
          disabled
          label="Country"
          {...form.getInputProps('country')}
          required
        />
      </div>
      <Button type="submit" color="green">
        Update
      </Button>
    </form>
  );
};

export default EmployerProfileEditForm;
