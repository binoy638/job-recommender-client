import { Button, NumberInput, Textarea, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { FC } from 'react';
import React, { useState } from 'react';
import type { CompanyFormData } from 'schemas';

import useSetFormFieldValue from '@/hooks/useSetFormFieldValue';

import AddressSelector from '../UI/AddressSelector';

interface CompnayFormProps {
  form: UseFormReturnType<CompanyFormData>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const CompanyForm: FC<CompnayFormProps> = ({ form, setActiveStep }) => {
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
  });

  useSetFormFieldValue(form, 'address', address);

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
      <AddressSelector setAddress={setAddress} />

      <Button type="submit">Next</Button>
    </form>
  );
};

export default CompanyForm;
