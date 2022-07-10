import { SearchIcon } from '@heroicons/react/outline';
import { Button, Select, TextInput } from '@mantine/core';
import { JobSearchType } from '@types';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

const SearchBar = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');

  const [value, setValue] = useState(JobSearchType.JOB_TITLE);

  const placeholder: string = useMemo(() => {
    if (value === JobSearchType.JOB_TITLE) {
      return 'Search by job title';
    }
    if (value === JobSearchType.COMPANY) {
      return 'Search by company name';
    }
    if (value === JobSearchType.LOCATION) {
      return 'Search by city';
    }
    return 'Search by skill';
  }, [value]);

  const handleSearch = () => {
    router.push(`/jobs/search?query=${query}&type=${value}`);
  };

  const rightSection = (
    <Button
      sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      onClick={handleSearch}
      color="teal"
      type="submit"
    >
      <SearchIcon className="h-5 w-5" />
    </Button>
  );

  return (
    <form className="mb-6 mr-3 flex gap-2">
      <Select
        value={value}
        onChange={(val) => {
          if (val) {
            setValue(val as JobSearchType);
          }
        }}
        data={[
          { value: JobSearchType.JOB_TITLE, label: 'Position' },
          { value: JobSearchType.COMPANY, label: 'Company' },
          { value: JobSearchType.CATEGORY, label: 'Category' },
          { value: JobSearchType.SKILL, label: 'Skill' },
        ]}
      />
      <TextInput
        style={{ width: '100%' }}
        placeholder={placeholder}
        rightSection={rightSection}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        required
      />
    </form>
  );
};

export default SearchBar;
