import {
  Checkbox,
  MultiSelect,
  NumberInput,
  Radio,
  RadioGroup,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { JobCategories } from '@types';
import { JobMode } from '@types';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import TextEditor from '@/components/UI/TextEditor';

const placeholder =
  'Enter Job requirements, skills, and other details about the job. This will be displayed on the job listing page.';

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
];

interface BasicJobDetailFormProps {
  categories: JobCategories[];
}

const JobCreateForm: FC<BasicJobDetailFormProps> = ({ categories }) => {
  const [value, onChange] = useState('');
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <form className="flex flex-col gap-10">
      <TextInput
        size="md"
        placeholder="eg. Senior Developer"
        label="Title"
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
        label="Location"
        orientation="vertical"
        sx={() => ({
          '.mantine-Group-root': {
            display: 'grid',
            gridTemplateColumns: 'auto auto ',
          },
        })}
        required
      >
        <Radio size="md" value={'W'} label="Work From Office" />
        <Radio size="md" value={'H'} label="Work From Home" />
      </RadioGroup>
      <RadioGroup
        label="Work Hours"
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
        <Radio value={JobMode.FULLTIME} label="Full Time" />
        <Radio value={JobMode.PARTTIME} label="Part Time" />
      </RadioGroup>
      <NumberInput size="md" label="Number of openings" required hideControls />
      <DatePicker size="md" label="Apply by" required />
      <DatePicker size="md" label="Joining Date" required />
      <div className="flex flex-col ">
        <Text size="md" mb={8}>
          Salary per annum (optional){' '}
        </Text>
        <div className="mb-4 flex gap-4">
          <NumberInput size="md" placeholder="min" hideControls />
          <NumberInput size="md" placeholder="max" hideControls />
        </div>

        <Checkbox label="Negotiable" />
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
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <MultiSelect
        data={data}
        label="Required Skills"
        searchable
        placeholder="Select required skills"
      />
    </form>
  );
};

export default JobCreateForm;
