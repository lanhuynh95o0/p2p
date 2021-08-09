import moment from 'moment';
import { APP_INFO } from 'constants/common';
export const JOB_DEFAULT = {
  // projectId: 0,
  jobDocuments: [], // [{id: 0, slug:'string'},]
  skills: [], // [{skillId: 0},],
  name: '',
  description: '',
  startDate: moment(),
  endDate: moment(),
  // currency: '',
  estimateCost: 0,
  progress: 0,
  participantPartnerId: null,
  participantPartnerName: '',
};

export const JOB_STEP = [
  { name: 'Tab 1', step: 1 },
  { name: 'Tab 2', step: 2 },
  { name: 'Tab 3', step: 3 },
  { name: 'Tab 4', step: 4 },
  { name: 'Tab 5', step: 5 },
];

export const JOB_CONFIRM_REMOVE = {
  TITLE: 'Archive job',
  MESSAGE: 'Are you sure to archive this job?',
};

export const JOB_UNKNOWN_USER_INVITE = {
  TITLE: 'Unknown contractor',
  CONTENT: `This contractor has not been on ${APP_INFO.NAME} platform yet. Do you want to continue to send invitation to this contractor?`,
  OK_TEXT: 'Send invitation',
  CANCEL_TEXT: 'Cancel',
};
