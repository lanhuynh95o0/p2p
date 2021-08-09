import moment from 'moment';
export const TASK_DEFAULT = {
  title: '',
  description: '',
  startDate: moment(),
  endDate: moment(),
  assigneeEmail: '',
};
export const TASK_CONFIRM_REMOVE = {
  TITLE: 'Archive task',
  MESSAGE: 'Are you sure to Archive this task?',
};

export const TASK_TYPE = {
  COMMENT: 'Comment',
  NOTE: 'Note',
  ATTACHMENT: 'Attachment',
  CONTRACT: 'Contract',
};

export const TASK_STATUS = {
  NA: {
    value: 'NA',
    color: 'text-dark-gray fs-12',
    label: 'N/A',
    tagClassName: 'default',
  },
  InProgress: {
    value: 'InProgress',
    color: 'text-warning fs-12',
    label: 'In progress',
    tagClassName: 'gold',
  },
  Completed: {
    value: 'Completed',
    color: 'text-success fs-12',
    label: 'Completed',
    tagClassName: 'blue',
  },
};
