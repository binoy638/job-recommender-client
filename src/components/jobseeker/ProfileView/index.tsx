import {
  AtSymbolIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { Divider, Text } from '@mantine/core';
import type { JobSeeker } from '@types';
import React from 'react';

import { formatAddress } from '@/components/job/ApplicationCardList';

import EducationList from './EducationList';
import ExperienceList from './ExperienceList';
import SkillList from './SkillList';

const Item = ({ label, icon }: { label: string; icon: React.ReactElement }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <Text>{label}</Text>
    </div>
  );
};

const ProfileView = ({ profile }: { profile: JobSeeker }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Text style={{ fontSize: '2rem' }} weight="bolder">
          {profile.firstName} {profile.lastName}
        </Text>
        <Item
          label={formatAddress(profile.address)}
          icon={<LocationMarkerIcon className="h-5 w-5 text-gray-600" />}
        />
        <Item
          label={profile.email}
          icon={<AtSymbolIcon className="h-5 w-5 text-gray-600" />}
        />
        <Item
          label={profile.phone}
          icon={<PhoneIcon className="h-5 w-5 text-gray-600" />}
        />
      </div>
      <Divider />

      <EducationList educations={profile.education} />

      <Divider />

      <ExperienceList experiences={profile.experience} />

      <Divider />

      <SkillList skills={profile.skills} />
    </div>
  );
};

export default ProfileView;
