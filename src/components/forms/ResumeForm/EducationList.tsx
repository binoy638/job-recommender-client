import { TrashIcon } from '@heroicons/react/solid';
import { Paper, Text } from '@mantine/core';
import type { Education } from '@types';
import React from 'react';

interface EducationCardProps extends Education {
  index: number;
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationCard = ({
  degree,
  institute,
  startYear,
  endYear,
  index,
  setEducations,
}: EducationCardProps) => {
  const deleteHandler = () => {
    setEducations((prev) => {
      return prev.filter((_, idx) => idx !== index);
    });
  };
  return (
    <Paper withBorder p={10}>
      <div className="flex justify-between">
        <div>
          <Text size="sm" weight="bolder">
            {degree}
          </Text>
          <Text size="sm">{institute}</Text>
          <Text size="sm">
            {startYear} - {endYear}
          </Text>
        </div>
        <div className="flex gap-2">
          <TrashIcon onClick={deleteHandler} className="h-5 w-5" />
        </div>
      </div>
    </Paper>
  );
};

interface EducationListProps {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationList = ({ educations, setEducations }: EducationListProps) => {
  if (!educations || educations.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2">
      {educations.map((edu, index) => {
        return (
          <EducationCard
            setEducations={setEducations}
            index={index}
            key={edu._id!}
            {...edu}
          />
        );
      })}
    </div>
  );
};

export default EducationList;
