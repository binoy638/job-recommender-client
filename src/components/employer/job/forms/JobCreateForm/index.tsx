import {
  Button,
  Checkbox,
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
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { JobFormData } from 'schemas';
import { jobPostSchema } from 'schemas';

import TextEditor from '@/components/UI/TextEditor';

import SkillSelection from './SkillSelection';

const placeholder =
  'Enter Job requirements, skills, and other details about the job. This will be displayed on the job listing page.';

interface BasicJobDetailFormProps {
  categories: JobCategories[];
}

const JobCreateForm: FC<BasicJobDetailFormProps> = ({ categories }) => {
  const form = useForm({
    schema: zodResolver(jobPostSchema),
    initialValues: {} as JobFormData,
  });
  const [editorValue, setEditorValue] = useState('');

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
    console.log(form.values);
  }, [form.values]);

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
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
            {...form.getInputProps('salaryMin')}
            placeholder="min"
            hideControls
          />
          <NumberInput
            size="md"
            {...form.getInputProps('salaryMax')}
            placeholder="max"
            hideControls
          />
        </div>

        <Checkbox
          label="Negotiable"
          {...form.getInputProps('salaryNegotiable')}
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
      <Button type="submit" variant="outline">
        Post Job
      </Button>
    </form>
  );
};

export default JobCreateForm;
