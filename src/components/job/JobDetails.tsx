import {
  CalendarIcon,
  CurrencyDollarIcon,
  ExternalLinkIcon,
  LocationMarkerIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import { Anchor, Divider, Paper, Text } from '@mantine/core';
import type { Address, JobWithPopulatedFields } from '@types';
import { JobMode } from '@types';
import React from 'react';

import { Utils } from '@/utils';

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

const LabelWithIcon = ({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <Text size="sm">{label}</Text>
    </div>
  );
};

interface JobDetailsProps {
  job: JobWithPopulatedFields;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  return (
    <Paper withBorder p={20}>
      <div className="flex flex-col gap-4">
        <div>
          <Text style={{ fontSize: '26px' }} weight="bolder">
            {job.jobTitle}
          </Text>
          <Text weight={'bolder'} color="dimmed">
            {job.employer.company.name}
          </Text>
        </div>
        <LabelWithIcon
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
              <LabelWithIcon
                icon={<LocationMarkerIcon className="h-4 w-4 text-gray-600" />}
                label={job.employer.company.employees.toString()}
              />
            )}
            <LabelWithIcon
              icon={<LocationMarkerIcon className="h-4 w-4 text-gray-600" />}
              label={formatLocation(job.employer.company.address)}
            />
          </div>
          <div>
            <Text size="sm">{job.employer.company.description}</Text>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default JobDetails;
