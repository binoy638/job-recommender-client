import {
  BriefcaseIcon,
  CheckIcon,
  ClipboardIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { Button, Loader, Stepper, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserType } from '@types';
import * as AuthAPI from 'API/authAPI';
import { useRouter } from 'next/router';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { z } from 'zod';

import AuthContainer from '@/components/Auth/AuthContainer';
import {
  AccountCreationForm,
  CompanyCreationForm,
} from '@/components/Auth/forms';
import AdminVerificationSvg from '@/components/Svg/AdminVerificationSvg';
import Layout from '@/layouts/BasicLayout';

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
  employees: z.number().min(1, { message: 'At least 1 employee' }),
  yearFounded: z.string().min(4, { message: 'Invalid Year' }),
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
      <Stepper.Step icon={<UserIcon className="h-5 w-5" />} />
      <Stepper.Step icon={<BriefcaseIcon className="h-5 w-5" />} />
      <Stepper.Step icon={<ClipboardIcon className="h-5 w-5" />} />
    </Stepper>
  );
};

const EmployerSignUp = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const { mutate, isLoading, error } = useMutation(AuthAPI.signUp, {
    onSuccess: () => {
      setActiveStep(3);
    },
  });

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
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const CompanyDetailsForm = useForm({
    schema: zodResolver(companyCreationSchema),
    initialValues: {
      name: '',
      description: '',
      yearFounded: '',
      website: '',
      employees: 1,
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
          <CompanyCreationForm
            form={CompanyDetailsForm}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <div>
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col items-center justify-center gap-6">
                <AdminVerificationSvg height={200} width={200} />
                <Text px={60}>
                  You can start posting jobs once your application is verified
                  by us.
                </Text>
              </div>
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
        return (
          <div className="flex flex-col items-center justify-center gap-6">
            {error ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <Text>Oh no, something went wrong.</Text>
                <Button
                  onClick={() => {
                    router.push('/signup');
                  }}
                  fullWidth
                  variant="outline"
                  radius={'xl'}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <Text>Application successfully submitted</Text>
                <Button
                  onClick={() => {
                    router.push('/signin/employer');
                  }}
                  fullWidth
                  color={'green'}
                  variant="outline"
                  radius={'xl'}
                >
                  Log In now
                </Button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <AuthContainer className="lg:mx-60">
      <div className="px-4 lg:px-12">
        <span className="mb-6 flex items-center justify-center text-2xl ">
          Register as an Employer
        </span>
        <StepperComponent activeStep={activeStep} />
        <div className="mt-8 flex items-center justify-center">
          {FormComponent()}
        </div>
      </div>
    </AuthContainer>
  );
};

EmployerSignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerSignUp;
