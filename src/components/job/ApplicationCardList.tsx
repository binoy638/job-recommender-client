import { CheckIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { Badge, Button, Loader, Paper, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import type {
  Education,
  EmployerJobApplication,
  Experience,
  Skill,
} from '@types';
import { ApplicationStatus } from '@types';
import Link from 'next/link';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import type { Address } from 'schemas';

import EmployerAPI from '@/API/EmployerAPI';
import { Utils } from '@/utils';

import LabelWithLeftIcon from '../UI/LabelWithLeftIcon';

export const formatAddress = (address: Address) => {
  return `${address.city}, ${address.state}, ${address.country}`;
};

const ExperienceList = ({ experiences }: { experiences: Experience[] }) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }
  return (
    <div className="flex gap-2">
      <Text size="xs" weight="bold">
        EXPERIENCE :
      </Text>
      <div>
        {experiences.map((experience, index) => {
          return (
            <Text key={experience.role + index} size="xs">
              {experience.role} - {experience.company}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

const EducationList = ({ educations }: { educations: Education[] }) => {
  if (!educations || educations.length === 0) {
    return null;
  }
  return (
    <div className="flex gap-2">
      <Text size="xs" weight="bold">
        EDUCATION :
      </Text>
      <div>
        {educations.map((education) => {
          return (
            <Text key={education._id} size="xs">
              {education.degree} - {education.institute}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

const SkillList = ({ skills }: { skills: Skill[] | undefined }) => {
  if (!skills || skills.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <Text size="xs" weight="bold">
        SKILLS :
      </Text>
      <div className="flex gap-2">
        {skills.map((skill) => {
          return <Badge key={skill._id}>{skill.name}</Badge>;
        })}
      </div>
    </div>
  );
};

const ButtonList = ({
  jobID,
  appID,
  jobSeekerID,
  type,
}: // type,
{
  jobID: number;
  appID: number;
  jobSeekerID: string;
  type: ApplicationStatus;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    EmployerAPI.updateJobApplicationStatus,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['job-applications', jobID]);
        showNotification({
          message: 'Application status changed successfully',
          color: 'teal',
          icon: <CheckIcon className="h-5 w-5 " />,
        });
      },
    }
  );

  const handleClick = (status: ApplicationStatus) => {
    mutate({ id: appID, status });
  };
  if (type === ApplicationStatus.PENDING) {
    return (
      <div className="mt-8 flex justify-between">
        <Link href={`/jobseeker/${jobSeekerID}`}>
          <Button variant="outline">
            {isLoading ? <Loader /> : 'View Profile'}
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            color="teal"
            variant="outline"
            onClick={() => handleClick(ApplicationStatus.SHORTLISTED)}
          >
            {isLoading ? <Loader /> : 'Shortlist'}
          </Button>
          <Button
            onClick={() => handleClick(ApplicationStatus.REJECTED)}
            color="red"
            variant="outline"
          >
            {isLoading ? <Loader /> : 'Reject'}
          </Button>
        </div>
      </div>
    );
  }

  if (type === ApplicationStatus.SHORTLISTED) {
    return (
      <div className="mt-8 flex justify-between">
        <Link href={`/jobseeker/${jobSeekerID}`}>
          <Button variant="outline">View Profile</Button>
        </Link>
        <div className="flex gap-2">
          <Button
            color="teal"
            variant="outline"
            onClick={() => handleClick(ApplicationStatus.APPROVED)}
          >
            {isLoading ? <Loader /> : 'Hire'}
          </Button>
          <Button
            onClick={() => handleClick(ApplicationStatus.REJECTED)}
            color="red"
            variant="outline"
          >
            {isLoading ? <Loader /> : 'Reject'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex justify-between">
      <Link href={`/jobseeker/${jobSeekerID}`}>
        <Button variant="outline">View Profile</Button>
      </Link>
    </div>
  );
};

interface Props {
  jobID: number;
  applications: EmployerJobApplication[];
  type: ApplicationStatus;
}

const ApplicationCardList = ({ jobID, applications, type }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {applications.length > 0 &&
        applications.map((app) => {
          return (
            <Paper withBorder p={20} key={app.id}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div>
                    <Text weight="bold" size="lg">
                      {app.jobSeeker.firstName} {app.jobSeeker.lastName}
                    </Text>
                    <LabelWithLeftIcon
                      icon={
                        <LocationMarkerIcon className="h-4 w-4 text-gray-600" />
                      }
                      label={formatAddress(app.jobSeeker.address)}
                    />
                  </div>
                  <div>
                    <Text size="xs" color={'dimmed'}>
                      APPLIED
                    </Text>
                    <Text size="xs">{Utils.formatWithTime(app.createdAt)}</Text>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <ExperienceList experiences={app.jobSeeker.experience} />
                  <EducationList educations={app.jobSeeker.education} />
                  <SkillList skills={app.jobSeeker.skills} />
                </div>
                <ButtonList
                  jobID={jobID}
                  jobSeekerID={app.jobSeeker.id}
                  appID={app.id}
                  type={type}
                />
              </div>
            </Paper>
          );
        })}
    </div>
  );
};

export default ApplicationCardList;
