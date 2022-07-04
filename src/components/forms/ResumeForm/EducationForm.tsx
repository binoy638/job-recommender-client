import { Button, NumberInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import type { EducationFormData } from 'schemas/jobseeker';
import { educationSchema } from 'schemas/jobseeker';

interface EducationFormProps {
  setEducations: React.Dispatch<React.SetStateAction<EducationFormData[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EducationForm = ({ setEducations, setModalOpen }: EducationFormProps) => {
  const form = useForm({
    schema: zodResolver(educationSchema),
    initialValues: {
      degree: '',
      institute: '',
    } as EducationFormData,
  });
  return (
    <div>
      <TextInput label="Degree" {...form.getInputProps('degree')} required />
      <TextInput
        label="Institution"
        {...form.getInputProps('institute')}
        required
      />
      <NumberInput
        hideControls
        label="Start Year"
        {...form.getInputProps('startYear')}
        required
      />
      <NumberInput
        hideControls
        label="End Year"
        {...form.getInputProps('endYear')}
      />
      <Button
        onClick={form.onSubmit(() => {
          setEducations((prev) => [...prev, form.values]);
          setModalOpen(false);
        })}
      >
        Submit
      </Button>
    </div>
  );
};

export default EducationForm;
