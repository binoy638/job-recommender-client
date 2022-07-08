import { LocationMarkerIcon } from '@heroicons/react/solid';
import { Paper, Text } from '@mantine/core';
import type { EmployerJobApplication, Experience } from '@types';
import React from 'react';
import type { Address } from 'schemas';

import { Utils } from '@/utils';

import LabelWithLeftIcon from '../UI/LabelWithLeftIcon';

export const formatAddress = (address: Address) => {
  return `${address.city}, ${address.state}, ${address.country}`;
};

export const ExperienceList = ({
  experiences,
}: {
  experiences: Experience[];
}) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }
  return (
    <div>
      <Text size="xs" color={'dimmed'}>
        EXPERIENCE
      </Text>
      <div>
        {experiences.map((experience) => {
          return (
            <Text key={experience.role} size="xs">
              {experience.role}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

interface Props {
  applications: EmployerJobApplication[];
}

const ApplicationCardList = ({ applications }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {applications.length > 0 &&
        applications.map((app) => {
          return (
            <Paper withBorder p={20} key={app.id}>
              <div className="flex justify-between">
                <div>
                  <Text weight="bold" size="lg">
                    {app.jobSeeker.firstName} {app.jobSeeker.lastName}
                  </Text>
                  <LabelWithLeftIcon
                    icon={
                      <LocationMarkerIcon className="h-4 w-4 text-gray-600" />
                    }
                    label={formatAddress(app.jobSeeker.address)}
                  />
                </div>
                <div>
                  <Text size="xs" color={'dimmed'}>
                    APPLIED
                  </Text>
                  <Text size="xs">{Utils.formatWithTime(app.createdAt)}</Text>
                </div>
              </div>
              <div>
                <ExperienceList experiences={app.jobSeeker.experience} />
              </div>
            </Paper>
          );
        })}
    </div>
  );
};

export default ApplicationCardList;
