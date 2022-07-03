import {
  CalendarIcon,
  CurrencyDollarIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import { Badge, Paper, Text } from '@mantine/core';
import type { JobWithPopulatedFields } from '@types';
import Link from 'next/link';
import React from 'react';

import { Utils } from '@/utils';

export const formatCTC = (salary: { min: number; max: number }) => {
  let minLPA: number = 0;
  let maxLPA: number = 0;
  if (salary.min > 0) {
    minLPA = Math.round(salary.min / 100000);
  }
  if (salary.max > 0) {
    maxLPA = Math.round(salary.max / 100000);
  }

  if (minLPA === maxLPA) {
    return `₹ ${minLPA} LPA`;
  }

  if (minLPA > 0 && maxLPA > 0) {
    return `₹ ${minLPA} - ₹ ${maxLPA} LPA`;
  }

  if (minLPA > 0) {
    return `₹ ${minLPA} LPA`;
  }

  return `₹ ${maxLPA} LPA`;
};

interface ItemProps {
  label: string;
  value: string;
  icon: React.ReactElement;
}
export const Item = ({ label, value, icon }: ItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        {icon}
        <Text style={{ fontSize: '12px' }} color="dimmed" weight={500}>
          {label}
        </Text>
      </div>
      <Text style={{ fontSize: '12px' }}>{value}</Text>
    </div>
  );
};

interface JobCardProps {
  job: JobWithPopulatedFields;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Paper withBorder p={20}>
      <div className="flex flex-col gap-1">
        <Link href={`/jobs/${job.id}`} passHref>
          <Text size="xl" weight="bolder" className="cursor-pointer">
            {job.jobTitle}
          </Text>
        </Link>

        <Text size="sm" weight="bolder" color="dimmed">
          {job.employer.company.name}
        </Text>
      </div>

      <div className="mt-6 flex gap-12">
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
      <div className="mt-4 flex gap-2">
        {job.requiredSkills.map((skill) => {
          return (
            <Badge color="green" key={skill._id}>
              {skill.name}
            </Badge>
          );
        })}
      </div>
    </Paper>
  );
};

export default JobCard;
