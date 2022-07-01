import { XIcon } from '@heroicons/react/solid';
import { Autocomplete, Badge } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';

const fetchSkills = async (q: string) => {
  const { data } = await GeneralAPI.searchSkills(q);
  return data;
};

interface Props {
  selectedSkills: {
    value: string;
    _id: string;
  }[];
  setSelectedSkills: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        _id: string;
      }[]
    >
  >;
}

const SkillSelection: FC<Props> = ({ selectedSkills, setSelectedSkills }) => {
  const [value, setValue] = useState('');
  const [data, setData] = useState<{ value: string; _id: string }[]>([]);

  const [debounceValue] = useDebouncedValue(value, 200);

  useEffect(() => {
    if (!debounceValue || debounceValue.length < 2) return;
    fetchSkills(debounceValue).then((res) => {
      const d = res.map((skill) => ({ value: skill.name, _id: skill._id }));
      setData(d);
    });
  }, [debounceValue]);

  const handleSkillSelect = (skill: { value: string; _id: string }) => {
    setSelectedSkills([...selectedSkills, skill]);
    setValue('');
  };

  const handleSkillRemove = (id: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill._id !== id));
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={setValue}
        onItemSubmit={handleSkillSelect}
        label="Required Skills"
        placeholder="Select required skills"
        data={data}
      />
      <div className="mt-2 flex gap-2">
        {selectedSkills.map((skill) => {
          return (
            <Badge
              key={skill._id}
              variant="outline"
              sx={{ paddingRight: 3 }}
              rightSection={
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleSkillRemove(skill._id)}
                />
              }
            >
              {skill.value}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSelection;
