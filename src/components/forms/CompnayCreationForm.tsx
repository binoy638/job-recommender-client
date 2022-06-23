import { Button, Textarea, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { FC } from 'react';
import React from 'react';

interface CompnayCreationFormProps {
  form: UseFormReturnType<{
    name: string;
    description: string;
    yearFounded: string;
    website: string;
    city: string;
    state: string;
    country: string;
  }>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const CompnayCreationForm: FC<CompnayCreationFormProps> = ({
  form,
  setActiveStep,
}) => {
  const handleSubmit = () => {
    setActiveStep(2);
  };

  return (
    <form
      className="flex w-full flex-col gap-4 px-10 lg:max-w-sm lg:px-0"
      onSubmit={form.onSubmit(handleSubmit)}
    >
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

      <TextInput
        label="Year Founded"
        {...form.getInputProps('yearFounded')}
        required
      />
      <TextInput label="Website" {...form.getInputProps('website')} required />
      <TextInput label="City" {...form.getInputProps('city')} required />
      <TextInput label="State" {...form.getInputProps('state')} required />
      <TextInput label="Country" {...form.getInputProps('country')} required />

      <Button type="submit"> Next </Button>
    </form>
  );
};

export default CompnayCreationForm;
