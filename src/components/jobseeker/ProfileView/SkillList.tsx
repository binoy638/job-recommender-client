import { Badge, Text } from '@mantine/core';
import type { Skill } from '@types';
import React from 'react';

const SkillList = ({ skills }: { skills: Skill[] | undefined }) => {
  if (!skills || skills.length === 0) {
    return null;
  }
  return (
    <div className="flex">
      <div className="w-64 ">
        <Text size="sm">SKILLS</Text>
      </div>
      <div className="flex w-full gap-2">
        {skills.map((skill) => {
          return <Badge key={skill._id}>{skill.name}</Badge>;
        })}
      </div>
    </div>
  );
};

export default SkillList;
