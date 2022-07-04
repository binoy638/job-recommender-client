import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useEffect } from 'react';

const useSetFormFieldValue = <T, K extends keyof T>(
  form: UseFormReturnType<T>,
  fieldName: K,
  fieldValue: T[K]
) => {
  useEffect(() => {
    form.setFieldValue(fieldName, fieldValue);
  }, [fieldValue]);
};

export default useSetFormFieldValue;
