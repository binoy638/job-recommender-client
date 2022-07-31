import { PencilIcon } from '@heroicons/react/outline';
import {
  AtSymbolIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { Divider, Text } from '@mantine/core';
import type { JobSeeker } from '@types';
import { UserType } from '@types';
import React from 'react';
import { useTypedSelector } from 'store';

import MessageButton from '@/components/employer/MessageButton';
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

const ProfileView = ({
  profile,
  editable = false,
}: {
  profile: JobSeeker;
  editable: boolean;
}) => {
  const { type } = useTypedSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Text style={{ fontSize: '2rem' }} weight="bolder">
            {profile.firstName} {profile.lastName}
          </Text>
          {editable && <PencilIcon className="h-5 w-5" />}
        </div>

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

      <div>
        <Text>{profile.about}</Text>
      </div>
      <EducationList editable={editable} educations={profile.education} />

      <ExperienceList editable={editable} experiences={profile.experience} />

      <SkillList skills={profile.skills} />
      <div className="mt-4 flex justify-end">
        {type === UserType.EMPLOYER && (
          <MessageButton jobseeker={profile._id} />
        )}
      </div>
    </div>
  );
};

export default ProfileView;
