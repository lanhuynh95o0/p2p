import { MyProgress } from 'components/Atoms';
import React from 'react';
import { separateCost } from 'utilities/stringHelper';
import { getTimeFormatNormal } from 'utilities/time';

export const SEARCH_PARAM = {
  skip: 0,
  take: 5,
  current: 1,
};

export const TYPE_REPORT = [
  { name: 'My contractors', key: 'participants' },
  { name: 'Projects', key: 'projects' },
  { name: 'Jobs', key: 'jobs' },
];

export const COL_PARTNER = [
  {
    title: 'Contractor',
    key: 'companyName',
    selected: true,
    className: 'col-header-bold',
  },
  {
    title: 'Code',
    key: 'id',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Email',
    key: 'email',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Phone',
    key: 'phone',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Address',
    key: 'address',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Jobs',
    key: 'jobs',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (value) => {
      return (value || []).length;
    },
  },
  {
    title: 'Total cost',
    key: 'totalCost',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (value) => {
      return separateCost(value);
    },
  },
  {
    title: 'Completed jobs',
    key: 'completedJobs',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'In Progress jobs',
    key: 'inprogressJobs',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Late jobs',
    key: 'lateJobs',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
];

export const COL_PROJECT = [
  {
    title: 'Project',
    key: 'name',
    selected: true,
    className: 'col-header-bold',
  },
  {
    title: 'Code',
    key: 'code',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Process',
    key: 'progress',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (text) => <MyProgress showInfo percent={+text || 0} />,
  },
  {
    title: 'Jobs',
    key: 'jobCount',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Tasks',
    key: 'taskCount',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Contractors',
    key: 'participants',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Timeline',
    key: 'timeline',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Documents',
    key: 'documentCount',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Total cost',
    key: 'totalCost',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (value) => {
      return separateCost(value);
    },
  },
  {
    title: 'Currency',
    key: 'currency',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Start date',
    key: 'startDate',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (date) => getTimeFormatNormal(date),
  },
  {
    title: 'End date',
    key: 'endDate',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (date) => getTimeFormatNormal(date),
  },
];

export const COL_JOB = [
  { title: 'Job', key: 'name', selected: true, className: 'col-header-bold' },
  {
    title: 'Code',
    key: 'code',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Project',
    key: 'projectName',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Start date',
    key: 'startDate',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (date) => getTimeFormatNormal(date),
  },
  {
    title: 'End date',
    key: 'endDate',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (date) => getTimeFormatNormal(date),
  },
  {
    title: 'Estimate code',
    key: 'estimateCost',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
    render: (amount) => separateCost(amount),
  },
  {
    title: 'Requirement skill',
    key: 'skillCount',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Documents',
    key: 'documentCount',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Contractor',
    key: 'partnerName',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Progress',
    key: 'progress',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Currency',
    key: 'currency',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Tasks',
    key: 'taskCount',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
  {
    title: 'Timeline',
    key: 'timeline',
    selected: true,
    align: 'center',
    className: 'col-header-bold',
  },
];
