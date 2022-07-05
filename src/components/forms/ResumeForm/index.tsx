import { Button, Modal, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { FC } from 'react';
import React, { useState } from 'react';
import type {
  EducationFormData,
  ExperienceFormData,
  JobSeekerResumeFormData,
} from 'schemas/jobseeker';

import AddressSelector from '@/components/forms/SpecialFields/AddressSelector';
import useSetFormFieldValue from '@/hooks/useSetFormFieldValue';

import MultiCategorySelector from '../SpecialFields/MultiCategorySelector';
import SkillSelector from '../SpecialFields/SkillSelector';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';

interface ResumeFormProps {
  form: UseFormReturnType<JobSeekerResumeFormData>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const ResumeForm: FC<ResumeFormProps> = ({ form }) => {
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [openedExpModal, setOpenedExpModal] = useState(false);
  const [openedEduModal, setOpenedEduModal] = useState(false);

  const [eductions, setEducations] = useState<EducationFormData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceFormData[]>([]);

  useSetFormFieldValue(form, 'address', address);
  useSetFormFieldValue(form, 'education', eductions);
  useSetFormFieldValue(form, 'experience', experiences);
  useSetFormFieldValue(form, 'skills', skills);
  useSetFormFieldValue(form, 'jobPreferences', categories);

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <form
      className="flex w-full flex-col gap-4 "
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <DatePicker
        {...form.getInputProps('dob')}
        size="md"
        label="Date of Birth"
        required
      />
      <Textarea label="About" {...form.getInputProps('about')} required />

      <Button variant="outline" onClick={() => setOpenedExpModal(true)}>
        Add Experience
      </Button>
      <Button variant="outline" onClick={() => setOpenedEduModal(true)}>
        Add Education
      </Button>
      <Modal
        opened={openedExpModal}
        onClose={() => setOpenedExpModal(false)}
        title="Add Experience"
      >
        <ExperienceForm
          setExperiences={setExperiences}
          setModalOpen={setOpenedExpModal}
        />
      </Modal>
      <Modal
        opened={openedEduModal}
        onClose={() => setOpenedEduModal(false)}
        title="Add Education"
      >
        <EducationForm
          setEducations={setEducations}
          setModalOpen={setOpenedEduModal}
        />
      </Modal>

      <AddressSelector setAddress={setAddress} />
      <SkillSelector setSkills={setSkills} />
      <MultiCategorySelector
        categories={categories}
        setCategories={setCategories}
      />
      <Button type="submit">Next</Button>
    </form>
  );
};

export default ResumeForm;
