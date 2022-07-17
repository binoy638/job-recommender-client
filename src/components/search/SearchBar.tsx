import { SearchIcon } from '@heroicons/react/outline';
import { Autocomplete, Button, Select } from '@mantine/core';
import { JobSearchType } from '@types';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';

import { fetchSkills } from '../forms/SpecialFields/SkillSelector';

const fetchCategories = async () => {
  const { data } = await GeneralAPI.getJobCategories();
  return data;
};

const SearchBar = () => {
  const router = useRouter();

  const [data, setData] = useState<string[]>([]);

  const [query, setQuery] = useState('');

  const [type, setType] = useState(JobSearchType.JOB_TITLE);

  const placeholder: string = useMemo(() => {
    if (type === JobSearchType.JOB_TITLE) {
      return 'Search by job title';
    }
    if (type === JobSearchType.COMPANY) {
      return 'Search by company name';
    }
    if (type === JobSearchType.LOCATION) {
      return 'Search by city';
    }
    if (type === JobSearchType.CATEGORY) {
      return 'Search by category';
    }
    return 'Search by skill';
  }, [type]);

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

  const rightSection = (
    <Button
      sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      color="teal"
      type="submit"
    >
      <SearchIcon className="h-5 w-5" />
    </Button>
  );

  return (
    <form className="mb-6 mr-3 flex gap-2" onSubmit={handleSearch}>
      <Select
        value={type}
        onChange={(val) => {
          if (val) {
            setType(val as JobSearchType);
          }
        }}
        data={[
          { value: JobSearchType.JOB_TITLE, label: 'Position' },
          { value: JobSearchType.COMPANY, label: 'Company' },
          { value: JobSearchType.CATEGORY, label: 'Category' },
          { value: JobSearchType.SKILL, label: 'Skill' },
        ]}
      />

      <Autocomplete
        style={{ width: '100%' }}
        value={query}
        onChange={setQuery}
        placeholder={placeholder}
        data={data}
        rightSection={rightSection}
        required
      />
    </form>
  );
};

export default SearchBar;
