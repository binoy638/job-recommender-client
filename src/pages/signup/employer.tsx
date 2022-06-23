import { CheckIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import { Stepper } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';

import { AccountCreationForm, CompnayCreationForm } from '@/components/forms';
import Layout from '@/layouts/Layout';

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
  const [activeStep, setActiveStep] = useState(0);

  const AccountDetailsForm = useForm({
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
