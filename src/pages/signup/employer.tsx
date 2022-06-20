import { CheckIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import { Stepper } from '@mantine/core';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';

import CompanyDetailsForm from '@/components/forms/CompanyDetailsForm';
import CreateAccountForm from '@/components/forms/CreateAccountForm';
import Layout from '@/layouts/Layout';

interface StepperComponentProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepperComponent: FC<StepperComponentProps> = ({
  activeStep,
  setActiveStep,
}) => {
  return (
    <Stepper
      active={activeStep}
      onStepClick={setActiveStep}
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

  const FormComponent = () => {
    switch (activeStep) {
      case 0:
        return <CreateAccountForm />;
      case 1:
        return <CompanyDetailsForm />;
      default:
        return null;
    }
  };

  return (
    <main>
      <StepperComponent activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="mt-8 flex items-center justify-center">
        {FormComponent()}
      </div>
    </main>
  );
};

EmployerSignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerSignUp;
