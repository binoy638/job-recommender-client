import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';

const fetchCategories = async () => {
  const { data } = await GeneralAPI.getJobCategories();
  return data.map((cat) => ({ value: cat._id, label: cat.name }));
};

interface MultiCategorySelectorProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiCategorySelector = ({
  categories,
  setCategories,
}: MultiCategorySelectorProps) => {
  const [data, setData] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((cat) => {
        setData(cat);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MultiSelect
      data={data}
      value={categories}
      onChange={setCategories}
      label="Select Prefered Job Categories"
    />
  );
};

export default MultiCategorySelector;
