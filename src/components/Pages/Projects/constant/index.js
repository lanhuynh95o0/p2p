import moment from 'moment';
import { APP_INFO } from 'constants/common';

export const PROJECT_SORT_BY = {
  Deadline: {
    id: 'Deadline',
    name: 'Timeline',
    getDescription: (isDesc) => isDesc ? 'Most overdue first' : 'Least overdue first'
  },
  CreatedTime: {
    id: 'CreatedTime',
    name: 'Creation time',
    getDescription: (isDesc) => isDesc ? 'Newest first' : 'Oldest first'
  },
  Name: {
    id: 'Name',
    name: 'Project name',
    getDescription: (isDesc) => isDesc ? 'Z-A' : 'A-Z'
  },
  Code: {
    id: 'Code',
    name: 'Project code',
    getDescription: (isDesc) => isDesc ? 'Z-A' : 'A-Z'
  },
  Completion: {
    id: 'Completion',
    name: 'Complete status',
    getDescription: (isDesc) => isDesc ? 'Most complete' : 'Least complete'
  }
};

export const PROJECT_STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
  { name: 'Tab 3', step: 3 },
  { name: 'Tab 4', step: 4 },
];

export const PROJECT_DEFAULT = {
  name: '',
  description: '',
  startDate: moment(),
  endDate: moment(),
  clientId: null,
  projectDocuments: [],
};

export const PROJECT_CONFIRM_REMOVE = {
  TITLE: 'Archive project',
  MESSAGE:
    `Are you sure to archive this project? This may affect to all ${APP_INFO.NAME} contractor profiles`,
};
