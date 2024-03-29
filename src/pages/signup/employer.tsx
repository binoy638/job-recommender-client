import {
  BriefcaseIcon,
  CheckIcon,
  ClipboardIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/solid';
import { Button, Loader, Stepper, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { UserType } from '@types';
import { useRouter } from 'next/router';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import type { AccountFormData, CompanyFormData } from 'schemas';
import { accountSchema, companySchema } from 'schemas';

import AuthAPI from '@/API/authAPI';
import AccountForm from '@/components/forms/AccountForm';
import CompanyForm from '@/components/forms/CompanyForm';
import AdminVerificationSvg from '@/components/Svg/AdminVerificationSvg';
import AuthContainer from '@/components/UI/AuthContainer';
import Layout from '@/layouts/BasicLayout';

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
      showNotification({
        message: 'Registered Successfully',
        color: 'teal',
        icon: <CheckIcon className="h-5 w-5 " />,
      });
      setActiveStep(3);
    },
    onError: () => {
      showNotification({
        message: 'Oh no! Something went wrong',
        color: 'red',
        icon: <XIcon className="h-5 w-5 " />,
      });
    },
  });

  const AccountDetailsForm = useForm({
    schema: zodResolver(accountSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    } as AccountFormData,
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const CompanyDetailsForm = useForm({
    schema: zodResolver(companySchema),
    initialValues: {
      name: '',
      description: '',
      website: '',
    } as CompanyFormData,
  });
  const formSubmitHandler = () => {
    const formValues = {
      ...AccountDetailsForm.values,
      company: CompanyDetailsForm.values,
    };
    mutate({ form: formValues, utype: UserType.EMPLOYER });
  };

  const FormComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AccountForm
            form={AccountDetailsForm}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <CompanyForm
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
              <Button onClick={formSubmitHandler}>
                {isLoading ? <Loader size={'sm'} /> : 'Submit For verification'}
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
