import { Button, NumberInput, Textarea, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { FC } from 'react';
import React from 'react';
import type { CompanyCreationFormData } from 'schemas';

interface CompnayCreationFormProps {
  form: UseFormReturnType<CompanyCreationFormData>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const CompanyCreationForm: FC<CompnayCreationFormProps> = ({
  form,
  setActiveStep,
}) => {
  const handleSubmit = () => {
    setActiveStep(2);
  };

  return (
    <form
      className="flex w-full flex-col gap-4 "
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
      <TextInput label="Website" {...form.getInputProps('website')} required />
      <TextInput label="City" {...form.getInputProps('city')} required />
      <TextInput label="State" {...form.getInputProps('state')} required />
      <TextInput label="Country" {...form.getInputProps('country')} required />

      <Button radius={'xl'} type="submit">
        Next
      </Button>
    </form>
  );
};

export default CompanyCreationForm;
