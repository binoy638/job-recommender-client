import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { Divider, Text } from '@mantine/core';
import type { Experience } from '@types';
import React from 'react';

const ExperienceList = ({
  experiences,
  editable,
}: {
  experiences: Experience[];
  editable: boolean;
}) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }
  return (
    <>
      <Divider />
      <div className="flex">
        <div className="w-64 ">
          <Text size="sm">EXPERIENCE</Text>
        </div>
        <div className="flex w-full flex-col gap-2">
          {experiences.map((experience) => {
            return (
              <div className="flex justify-between " key={experience._id}>
                <div>
                  <Text weight="bolder">{experience.role}</Text>
                  <Text>{experience.company}</Text>
                  <Text>
                    {experience.startYear} - {experience.endYear}
                  </Text>
                </div>
                {editable && (
                  <div className="flex gap-2">
                    <PencilIcon className="h-5 w-5" />
                    <TrashIcon className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ExperienceList;
