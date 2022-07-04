import { Button, NumberInput, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import type { ExperienceFormData } from 'schemas/jobseeker';
import { experienceSchema } from 'schemas/jobseeker';

interface ExperienceFormProps {
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceFormData[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExperienceForm = ({
  setExperiences,
  setModalOpen,
}: ExperienceFormProps) => {
  const form = useForm({
    schema: zodResolver(experienceSchema),
    initialValues: {
      role: '',
      company: '',
      description: '',
    } as ExperienceFormData,
  });
  return (
    <div className="flex flex-col gap-4">
      <TextInput label="Role" {...form.getInputProps('role')} required />
      <TextInput label="Company" {...form.getInputProps('company')} required />
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
      <Textarea label="Description" {...form.getInputProps('description')} />
      <Button
        onClick={form.onSubmit(() => {
          setExperiences((prev) => [...prev, form.values]);
          setModalOpen(false);
        })}
      >
        Submit
      </Button>
    </div>
  );
};

export default ExperienceForm;
