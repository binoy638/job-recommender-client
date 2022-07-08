import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { Text } from '@mantine/core';
import type { Education } from '@types';
import React from 'react';

const EducationList = ({ educations }: { educations: Education[] }) => {
  if (!educations || educations.length === 0) {
    return null;
  }
  return (
    <div className="flex">
      <div className="w-64">
        <Text size="sm">EDUCATION</Text>
      </div>
      <div className="flex w-full flex-col">
        {educations.map((education) => {
          return (
            <div className="flex justify-between " key={education._id}>
              <div>
                <Text weight="bolder">{education.degree}</Text>
                <Text>{education.institute}</Text>
                <Text>
                  {education.startYear} - {education.endYear}
                </Text>
              </div>
              <div className="flex gap-2">
                <PencilIcon className="h-5 w-5" />
                <TrashIcon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationList;
