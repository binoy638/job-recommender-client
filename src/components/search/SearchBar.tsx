import { SearchIcon } from '@heroicons/react/outline';
import { Autocomplete, Button, Select } from '@mantine/core';
import { JobSearchType } from '@types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';

import { fetchSkills } from '../forms/SpecialFields/SkillSelector';

const fetchCategories = async () => {
  const { data } = await GeneralAPI.getJobCategories();
  return data;
};

const rightSection = <Button hidden type="submit"></Button>;

const SearchBar = () => {
  const router = useRouter();

  const searchType = router.query.type as JobSearchType;

  const [data, setData] = useState<string[]>([]);

  const [query, setQuery] = useState('');

  const [type, setType] = useState(searchType || JobSearchType.JOB_TITLE);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: '/jobs/search',
      query: { query, type },
    });
  };

  useEffect(() => {
    if (type === JobSearchType.SKILL && query.length > 2) {
      fetchSkills(query)
        .then((d) => {
          const formattedData = d.map((skill) => skill.name);
          setData(formattedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (type === JobSearchType.CATEGORY && query.length > 2) {
      fetchCategories()
        .then((d) => {
          const formattedData = d.map((cat) => cat.name);
          setData(formattedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query, type]);

  useEffect(() => {
    setQuery('');
    setData([]);
  }, [type]);

  return (
    <form className="  flex gap-2" onSubmit={handleSearch}>
      <Select
        value={type}
        onChange={(val) => {
          if (val) {
            setType(val as JobSearchType);
          }
        }}
        radius={'xl'}
        data={[
          { value: JobSearchType.JOB_TITLE, label: 'Position' },
          { value: JobSearchType.COMPANY, label: 'Company' },
          { value: JobSearchType.CATEGORY, label: 'Category' },
          { value: JobSearchType.SKILL, label: 'Skill' },
        ]}
      />
      <Autocomplete
        style={{ width: '100%' }}
        radius={'xl'}
        value={query}
        onChange={setQuery}
        placeholder={'Search..'}
        data={data}
        icon={<SearchIcon className="h-5 w-5" />}
        rightSection={rightSection}
        required
      />
    </form>
  );
};

export default SearchBar;
