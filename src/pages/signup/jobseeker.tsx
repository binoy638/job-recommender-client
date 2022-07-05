import {
  BriefcaseIcon,
  CheckIcon,
  ClipboardIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { Button, Loader, Stepper, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserType } from '@types';
import { useRouter } from 'next/router';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import type { AccountFormData } from 'schemas';
import { accountSchema } from 'schemas';
import type { JobSeekerResumeFormData } from 'schemas/jobseeker';
import { JobSeekerResumeSchema } from 'schemas/jobseeker';

import AuthAPI from '@/API/authAPI';
import AccountForm from '@/components/forms/AccountForm';
import ResumeForm from '@/components/forms/ResumeForm';
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

const JobSeekerSignUp = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const { mutate, isLoading, error } = useMutation(AuthAPI.signUp, {
    onSuccess: () => {
      setActiveStep(3);
    },
  });

  const AccountDetailsForm = useForm({
    schema: zodResolver(accountSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    } as AccountFormData,
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const resumeForm = useForm({
    schema: zodResolver(JobSeekerResumeSchema),
    initialValues: {
      about: '',
    } as JobSeekerResumeFormData,
  });
  const formSubmitHandler = () => {
    const formValues = {
      ...AccountDetailsForm.values,
      ...resumeForm.values,
    };
    mutate({ form: formValues, utype: UserType.JOBSEEKER });
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
        return <ResumeForm form={resumeForm} setActiveStep={setActiveStep} />;
      case 2:
        return (
          <div>
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col items-center justify-center gap-6">
                <AdminVerificationSvg height={200} width={200} />
                <Text px={60}>Complete Registration</Text>
              </div>
              <Button
                onClick={formSubmitHandler}
                rightIcon={isLoading && <Loader />}
              >
                Submit
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
                    router.push('/signin/jobseeker');
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
          Register as an JobSeeker
        </span>
        <StepperComponent activeStep={activeStep} />
        <div className="mt-8 flex items-center justify-center">
          {FormComponent()}
        </div>
      </div>
    </AuthContainer>
  );
};

JobSeekerSignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default JobSeekerSignUp;
