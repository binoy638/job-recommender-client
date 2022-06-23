import { Textarea, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { EmployerSignupFormValues } from '@types';
import type { FC } from 'react';
import React from 'react';

interface CompanyDetailsFormProps {
  form: UseFormReturnType<EmployerSignupFormValues>;
}

const CompanyDetailsForm: FC<CompanyDetailsFormProps> = ({ form }) => {
  return (
    <form className="flex w-full flex-col gap-4 px-10 lg:max-w-sm lg:px-0">
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
    </form>
  );
};

export default CompanyDetailsForm;
