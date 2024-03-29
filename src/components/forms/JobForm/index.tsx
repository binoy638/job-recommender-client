import {
  Button,
  Checkbox,
  Loader,
  NumberInput,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import type { JobCategory } from '@types';
import { JobMode, WorkHours } from '@types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import type { JobFormData } from 'schemas';
import { jobPostSchema } from 'schemas';

import EmployerAPI from '@/API/EmployerAPI';
import useSetFormFieldValue from '@/hooks/useSetFormFieldValue';

import SkillSelector from '../SpecialFields/SkillSelector';

const placeholder =
  'Enter Job requirements, skills, and other details about the job. This will be displayed on the job listing page.';

const TextEditor = dynamic(() => import('@/components/UI/TextEditor'), {
  // Disable during server side rendering
  ssr: false,
  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => <Textarea />,
});

interface BasicJobDetailFormProps {
  categories: JobCategory[];
}

const JobCreateForm: FC<BasicJobDetailFormProps> = ({ categories }) => {
  const [error, setError] = useState('');

  const router = useRouter();

  const { mutate, isLoading } = useMutation(EmployerAPI.addJob, {
    onSuccess: () => router.push('/employer/dashboard'),
    onError: () => setError('Oh no! Something went wrong.'),
  });

  const form = useForm({
    schema: zodResolver(jobPostSchema),
    initialValues: {
      jobTitle: '',
    } as JobFormData,
  });
  const [editorValue, setEditorValue] = useState('');

  const [salary, setSalary] = useState<
    { min: number; max: number; negotiable: boolean } | undefined
  >();

  const [skills, setSkills] = useState<string[]>([]);

  const handleRichTextEditorChange = (value: string) => {
    console.log(value);
    setEditorValue(value);
    form.setFieldValue('description', value);
  };

  useSetFormFieldValue(form, 'requiredSkills', skills);
  useSetFormFieldValue(form, 'salary', salary);

  const handleSubmit = (values: typeof form.values) => {
    mutate(values);
  };

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        size="md"
        placeholder="eg. Senior Developer"
        label="Title"
        {...form.getInputProps('jobTitle')}
        required
      />

      <RadioGroup
        size="md"
        label="Select a Category"
        orientation="vertical"
        sx={() => ({
          '.mantine-Group-root': {
            display: 'grid',
            gridTemplateColumns: 'auto auto ',
          },
        })}
        {...form.getInputProps('category')}
        required
      >
        {categories.map((category) => {
          return (
            <Radio
              key={category._id}
              value={category._id}
              label={category.name}
            />
          );
        })}
      </RadioGroup>
      <RadioGroup
        size="md"
        label="Mode"
        {...form.getInputProps('mode')}
        orientation="vertical"
        sx={() => ({
          '.mantine-Group-root': {
            display: 'grid',
            gridTemplateColumns: 'auto auto ',
          },
        })}
        required
      >
        <Radio size="md" value={JobMode.WFO} label="Work From Office" />
        <Radio size="md" value={JobMode.WFH} label="Work From Home" />
      </RadioGroup>
      <RadioGroup
        label="Work Hours"
        {...form.getInputProps('workHours')}
        size="md"
        orientation="vertical"
        sx={() => ({
          '.mantine-Group-root': {
            display: 'grid',
            gridTemplateColumns: 'auto auto ',
          },
        })}
        required
      >
        <Radio value={WorkHours.FULLTIME} label="Full Time" />
        <Radio value={WorkHours.PARTTIME} label="Part Time" />
      </RadioGroup>
      <NumberInput
        {...form.getInputProps('numberOfOpenings')}
        size="md"
        label="Number of openings"
        required
        hideControls
      />
      <DatePicker
        {...form.getInputProps('applyBy')}
        size="md"
        label="Apply by"
        required
      />
      <DatePicker
        {...form.getInputProps('startDate')}
        size="md"
        label="Joining Date"
        required
      />
      <div className="flex flex-col ">
        <Text size="md" mb={8}>
          Salary per annum (optional)
        </Text>
        <div className="mb-4 flex gap-4">
          <NumberInput
            size="md"
            placeholder="min"
            onChange={(value) => {
              if (!value) return;
              setSalary({
                max: salary?.max || 0,
                negotiable: salary?.negotiable || false,
                min: value,
              });
            }}
            hideControls
          />
          <NumberInput
            size="md"
            onChange={(value) => {
              if (!value) return;
              setSalary({
                min: salary?.min || 0,
                negotiable: salary?.negotiable || false,
                max: value,
              });
            }}
            placeholder="max"
            hideControls
          />
        </div>

        <Checkbox
          label="Negotiable"
          onChange={(event) =>
            setSalary({
              min: salary?.max || 0,
              max: salary?.max || 0,
              negotiable: event.currentTarget.checked,
            })
          }
        />
      </div>
      <div>
        <Text size="md" mb={8}>
          Job Description<span className="text-red-500">*</span>
        </Text>
        <TextEditor
          value={editorValue}
          placeholder={placeholder}
          onChange={handleRichTextEditorChange}
        />
      </div>
      <SkillSelector label="Required Skills" setSkills={setSkills} />
      {error && <small className="text-red-500">{error}</small>}
      <Button type="submit" variant="outline">
        {isLoading ? <Loader size={20} /> : 'Post Job'}
      </Button>
    </form>
  );
};

export default JobCreateForm;
