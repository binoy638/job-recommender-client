import { TrashIcon } from '@heroicons/react/solid';
import { Paper, Text } from '@mantine/core';
import type { Experience } from '@types';
import React from 'react';

interface ExperienceCardProps extends Experience {
  index: number;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceCard = ({
  role,
  company,
  startYear,
  endYear,
  index,
  setExperiences,
}: ExperienceCardProps) => {
  const deleteHandler = () => {
    setExperiences((prev) => {
      return prev.filter((_, idx) => idx !== index);
    });
  };

  return (
    <Paper withBorder p={10}>
      <div className="flex justify-between">
        <div>
          <Text size="sm" weight="bolder">
            {role}
          </Text>
          <Text size="sm">{company}</Text>
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

interface ExperienceListProps {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceList = ({
  experiences,
  setExperiences,
}: ExperienceListProps) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2">
      {experiences.map((exp, index) => {
        return (
          <ExperienceCard
            setExperiences={setExperiences}
            key={exp._id!}
            index={index}
            {...exp}
          />
        );
      })}
    </div>
  );
};

export default ExperienceList;
