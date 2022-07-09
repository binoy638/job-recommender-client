import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import type { EducationFormData } from 'schemas/jobseeker';
import { educationSchema } from 'schemas/jobseeker';

const data = [
  {
    value: 'Bachelors in Computer Science and IT',
    label: 'Bachelors in Computer Science and IT',
  },
  {
    value: 'Bachelors in Electrical Engineering',
    label: 'Bachelors in Electrical Engineering',
  },
  {
    value: 'Bachelors in Civil Engineering and Construction',
    label: 'Bachelors in Civil Engineering and Construction',
  },
  { value: 'Bachelors in Medicine', label: 'Bachelors in Medicine' },
  {
    value: 'Bachelors in Architecture',
    label: 'Bachelors in Architecture',
  },
  { value: 'Bachelors in Design', label: 'Bachelors in Design' },
  {
    value: 'Bachelors in International Relations',
    label: 'Bachelors in International Relations',
  },
  {
    value: 'Bachelors in Language Studies',
    label: 'Bachelors in Language Studies',
  },
  {
    value: 'Masters in Computer Science and IT',
    label: 'Masters in Computer Science and IT',
  },
  {
    value: 'Masters in Electrical Engineering',
    label: 'Masters in Electrical Engineering',
  },
  {
    value: 'Masters in Civil Engineering and Construction',
    label: 'Masters in Civil Engineering and Construction',
  },
  { value: 'Masters in Medicine', label: 'Masters in Medicine' },
  {
    value: 'Masters in Architecture',
    label: 'Masters in Architecture',
  },
  { value: 'Masters in Design', label: 'Masters in Design' },
  {
    value: 'Masters in International Relations',
    label: 'Masters in International Relations',
  },
  {
    value: 'Masters in Language Studies',
    label: 'Masters in Language Studies',
  },
];

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
      <Select
        label="Degree"
        placeholder="Pick one"
        {...form.getInputProps('degree')}
        data={data}
        required
      />
      {/* <TextInput label="Degree" {...form.getInputProps("degree")} required /> */}
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
