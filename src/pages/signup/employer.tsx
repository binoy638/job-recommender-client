import { CheckIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import { Button, Loader, Stepper } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserType } from '@types';
import * as AuthAPI from 'API/authAPI';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { z } from 'zod';

import { AccountCreationForm, CompnayCreationForm } from '@/components/forms';
import Layout from '@/layouts/Layout';

const accountCreationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name should have at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last Name should have at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number should have at least 10 digits' }),
  password: z
    .string()
    .min(6, { message: 'Password should have at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password should have at least 8 characters' }),
});

const companyCreationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Company Name should have at least 2 characters' }),
  description: z
    .string()
    .min(2, { message: 'Description should have at least 10 characters' })
    .max(1000, {
      message: 'Description can have at most least 1000 characters',
    }),
  yearFounded: z.string().length(4, { message: 'Invalid Year' }),
  website: z.string().url({ message: 'Invalid website' }),
  city: z
    .string()
    .min(2, { message: 'City should have at least 2 characters' }),
  state: z
    .string()
    .min(2, { message: 'State should have at least 2 characters' }),
  country: z
    .string()
    .min(2, { message: 'State should have at least 2 characters' }),
});

interface StepperComponentProps {
  activeStep: number;
}
const StepperComponent: FC<StepperComponentProps> = ({ activeStep }) => {
  return (
    <Stepper
      active={activeStep}
      completedIcon={<CheckIcon className="h-5 w-5" />}
    >
      <Stepper.Step
        icon={<UserIcon className="h-5 w-5" />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step
        icon={<MailIcon className="h-5 w-5" />}
        label="Step 2"
        description="Company details"
      />
      <Stepper.Step
        icon={<CheckIcon className="h-5 w-5" />}
        label="Step 3"
        description="Submit for verification"
      />
    </Stepper>
  );
};

const EmployerSignUp = () => {
  const { mutate, isLoading } = useMutation(AuthAPI.signUp);

  const [activeStep, setActiveStep] = useState(0);

  const AccountDetailsForm = useForm({
    schema: zodResolver(accountCreationSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const CompanyDetailsForm = useForm({
    schema: zodResolver(companyCreationSchema),
    initialValues: {
      name: '',
      description: '',
      yearFounded: '',
      website: '',
      // logo: string;
      city: '',
      state: '',
      country: '',
    },
  });
  const formSubmitHandler = () => {
    const { city, country, state, ...otherComanyDetails } =
      CompanyDetailsForm.values;
    const formattedCompanyDetails = {
      address: { city, country, state },
      ...otherComanyDetails,
    };
    const formValues = {
      ...AccountDetailsForm.values,
      company: formattedCompanyDetails,
    };
    mutate({ form: formValues, utype: UserType.EMPLOYER });
  };
  const FormComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AccountCreationForm
            form={AccountDetailsForm}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <CompnayCreationForm
            form={CompanyDetailsForm}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <div>
            <div>
              <Button
                onClick={formSubmitHandler}
                rightIcon={isLoading && <Loader />}
              >
                Submit For verification
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <StepperComponent activeStep={activeStep} />
      <div className="mt-8 flex items-center justify-center">
        {FormComponent()}
      </div>
    </main>
  );
};

EmployerSignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerSignUp;
