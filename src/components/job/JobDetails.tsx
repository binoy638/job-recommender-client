import {
  CalendarIcon,
  CheckIcon,
  CurrencyDollarIcon,
  ExternalLinkIcon,
  LocationMarkerIcon,
  PlayIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Anchor, Badge, Button, Divider, Paper, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import type { Address, JobWithPopulatedFields } from '@types';
import { JobMode, UserType } from '@types';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import { useTypedSelector } from 'store';

import JobSeekerAPI from '@/API/JobSeekerAPI';
import { Utils } from '@/utils';

import LabelWithLeftIcon from '../UI/LabelWithLeftIcon';
import { formatCTC, Item } from './JobCard';

const formatLocation = (location: Address) => {
  return `${location.city}, ${location.state}, ${location.country}`;
};

const displayLocation = (mode: JobMode, location: Address) => {
  if (mode === JobMode.WFO) {
    return formatLocation(location);
  }
  return 'Remote';
};

interface JobDetailsProps {
  job: JobWithPopulatedFields;
  isEmployer?: boolean;
}

const JobDetails = ({ job, isEmployer = false }: JobDetailsProps) => {
  const { type } = useTypedSelector((state) => state.user);

  const router = useRouter();

  const { mutate } = useMutation(JobSeekerAPI.postApplication, {
    onSuccess: () => {
      showNotification({
        message: 'Job Application Submitted Successfully',
        color: 'teal',
        icon: <CheckIcon className="h-5 w-5 " />,
      });
    },
    onError: (err: AxiosError) => {
      const status = err.response?.status;
      showNotification({
        message:
          status === 400
            ? 'You have already applied to this job'
            : 'Oh no! Something went wrong',
        color: 'red',
        icon: <XIcon className="h-5 w-5 " />,
      });
    },
  });

  const handleSubmit = () => {
    if (isEmployer) {
      router.push(`/employer/job/${job.id}/applications`);
      return;
    }
    if (type === UserType.JOBSEEKER) {
      mutate({
        job: job._id,
      });
      return;
    }
    showNotification({
      message: 'You need to be logged in as Job Seeker to apply for a job',
      color: 'red',
      icon: <XIcon className="h-5 w-5 " />,
    });
  };

  return (
    <Paper withBorder shadow="xs" p={20}>
      <div className="flex flex-col gap-4">
        <div>
          <Text style={{ fontSize: '26px' }} weight="bolder">
            {job.jobTitle}
          </Text>
          <Text weight={'bolder'} color="dimmed">
            {job.employer.company.name}
          </Text>
        </div>
        <LabelWithLeftIcon
          icon={<LocationMarkerIcon className="h-4 w-4 text-gray-600" />}
          label={displayLocation(job.mode, job.employer.company.address)}
        />

        <div className=" flex gap-12">
          <Item
            label="START DATE"
            value={Utils.formatDate(job.startDate)}
            icon={<PlayIcon className="h-3 w-3 text-gray-600" />}
          />

          {job?.salary && (job.salary.min > 0 || job.salary.max > 0) ? (
            <Item
              label="CTC"
              value={formatCTC(job.salary)}
              icon={<CurrencyDollarIcon className="h-3 w-3 text-gray-600" />}
            />
          ) : null}
          <Item
            label="APPLY BY"
            value={Utils.formatDate(job.applyBy)}
            icon={<CalendarIcon className="h-3 w-3 text-gray-600" />}
          />
        </div>
        <Divider />
        <div>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
        <div className="flex flex-col gap-2">
          <Text size="md" weight={'bolder'}>
            Skills Required
          </Text>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill) => {
              return (
                <Badge color="gray" key={skill._id}>
                  {skill.name}
                </Badge>
              );
            })}
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-3">
          <div>
            <Text size="md" weight={'bolder'}>
              About {job.employer.company.name}
            </Text>
            <Anchor
              size="sm"
              href={job.employer.company.website}
              target="_blank"
              className="flex items-center gap-1"
            >
              <ExternalLinkIcon className="h-4 w-4" /> Website
            </Anchor>
          </div>

          <div>
            {job.employer.company.employees && (
              <LabelWithLeftIcon
                icon={<UsersIcon className="h-4 w-4 text-gray-600" />}
                label={job.employer.company.employees.toString()}
              />
            )}
            <LabelWithLeftIcon
              icon={<LocationMarkerIcon className="h-4 w-4 text-gray-600" />}
              label={formatLocation(job.employer.company.address)}
            />
          </div>
          <div>
            <Text size="sm">{job.employer.company.description}</Text>
          </div>
        </div>
        <div className="mt-8 flex">
          {isEmployer ? (
            <Button onClick={handleSubmit} variant="outline" px={50}>
              View Applications
            </Button>
          ) : (
            <Button onClick={handleSubmit} color="green" px={50}>
              Apply
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default JobDetails;
