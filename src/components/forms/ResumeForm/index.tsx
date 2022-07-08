import { CalendarIcon, PlusSmIcon } from '@heroicons/react/outline';
import { Button, Modal, Text, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
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
import EducationList from './EducationList';
import ExperienceForm from './ExperienceForm';
import ExperienceList from './ExperienceList';

interface ResumeFormProps {
  form: UseFormReturnType<JobSeekerResumeFormData>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const ResumeForm: FC<ResumeFormProps> = ({ form, setActiveStep }) => {
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

  useEffect(() => {
    console.log(skills);
  }, [skills]);

  const handleSubmit = () => {
    setActiveStep(2);
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
        icon={<CalendarIcon className="h-5 w-5" />}
        required
      />
      <Textarea
        label="About"
        size="md"
        {...form.getInputProps('about')}
        required
      />
      <EducationList setEducations={setEducations} educations={eductions} />
      <div
        className="flex cursor-pointer text-blue-500"
        onClick={() => setOpenedEduModal(true)}
      >
        <PlusSmIcon className="h-4 w-4" />
        <Text size="xs"> Add Education</Text>
      </div>

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
      <ExperienceList
        setExperiences={setExperiences}
        experiences={experiences}
      />
      <div
        className="flex cursor-pointer text-blue-500"
        onClick={() => setOpenedExpModal(true)}
      >
        <PlusSmIcon className="h-4 w-4" />
        <Text size="xs">Add Experience</Text>
      </div>
      <SkillSelector label="Skills" setSkills={setSkills} />
      <MultiCategorySelector
        categories={categories}
        setCategories={setCategories}
      />
      <Button type="submit">Next</Button>
    </form>
  );
};

export default ResumeForm;
