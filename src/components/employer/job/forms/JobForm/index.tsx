import {
  Button,
  Checkbox,
  Loader,
  NumberInput,
  Radio,
  RadioGroup,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import type { JobCategories } from '@types';
import { JobMode, WorkHours } from '@types';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import type { JobFormData } from 'schemas';
import { jobPostSchema } from 'schemas';

import EmployerAPI from '@/API/EmployerAPI';
import TextEditor from '@/components/UI/TextEditor';

import SkillSelection from './SkillSelection';

const placeholder =
  'Enter Job requirements, skills, and other details about the job. This will be displayed on the job listing page.';

interface BasicJobDetailFormProps {
  categories: JobCategories[];
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

  const [selectedSkills, setSelectedSKills] = useState<
    { value: string; _id: string }[]
  >([]);

  const handleRichTextEditorChange = (value: string) => {
    setEditorValue(value);
    form.setFieldValue('description', value);
  };

  useEffect(() => {
    const selectedSkillsIds = selectedSkills.map((skill) => skill._id);
    form.setFieldValue('requiredSkills', selectedSkillsIds);
  }, [selectedSkills]);

  useEffect(() => {
    form.setFieldValue('salary', salary);
  }, [salary]);

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
                min: salary?.max || 0,
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
          controls={[
            ['bold', 'italic', 'underline'],
            [
              'unorderedList',
              'orderedList',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
            ],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
          value={editorValue}
          placeholder={placeholder}
          onChange={handleRichTextEditorChange}
        />
      </div>
      <SkillSelection
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSKills}
      />
      {error && <small className="text-red-500">{error}</small>}
      <Button type="submit" variant="outline">
        {isLoading ? <Loader size={20} /> : 'Post Job'}
      </Button>
    </form>
  );
};

export default JobCreateForm;
