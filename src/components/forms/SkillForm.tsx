import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { Button, Loader, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import type { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import AdminAPI from '@/API/adminAPI';

const SkillForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AdminAPI.addSkills, {
    onSuccess: () => {
      showNotification({
        // title: 'Default notification',
        message: 'New Skill Added Successfully',
        color: 'teal',
        icon: <CheckIcon className="h-5 w-5 " />,
      });
      form.setFieldValue('name', '');
      queryClient.invalidateQueries('skills');
    },
    onError: (err: AxiosError) => {
      showNotification({
        // title: 'Default notification',
        message: 'Oh no! Something went wrong',
        color: 'red',
        icon: <XIcon className="h-5 w-5 " />,
      });
      if (err && err?.response?.status === 422) {
        form.setErrors({ name: 'Skill already exists' });
        return;
      }
      form.setErrors({ name: 'Something went wrong' });
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    mutate(values.name);
  };

  return (
    <form
      className="mb-10 flex w-1/4 gap-2"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        required
        placeholder="Skill Name"
        {...form.getInputProps('name')}
      />

      <div>
        <Button rightIcon={isLoading && <Loader />} color="teal" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default SkillForm;
