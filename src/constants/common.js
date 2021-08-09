export const APP_INFO = {
  NAME: 'Edgeb2b',
};

export const COMMENT_TYPE = {
  NOTE: 'Note',
  CONTRACT: 'Contract',
  DOCUMENT: 'Attachment',
  TASK: 'Task',
};

export const SKILL_STATUS = {
  PENDING: 'Pending',
  VERIFY: 'Verify',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
};

export const INVITE_STATUS = {
  ACCEPTED: 'Accepted',
  PENDING: 'Pending',
};

export const VIEW_MODE = {
  GRID: 1,
  LIST: 2,
};

export const SORT_BY_TIME = [
  {
    id: 'Newest',
    name: 'Newest',
  },
  {
    id: 'Oldest',
    name: 'Oldest',
  },
];

export const FILLTER_BY_STATUS = [
  {
    id: ' ',
    name: 'All',
  },
  {
    id: 'New',
    name: 'New',
  },
  {
    id: 'Inprogress',
    name: 'Inprogress',
  },
  {
    id: 'Done',
    name: 'Done',
  },
];

export const SORT_BY_ASSIGN = [
  {
    id: 'All',
    name: 'All',
  },
  {
    id: 'Own',
    name: 'Own',
  },
  {
    id: 'Assigned',
    name: 'Assigned',
  },
];

export const SORT_BY_JOB_ASSIGN = [
  {
    id: 'All',
    name: 'All',
  },
  {
    id: 'JobOffers',
    name: 'Job Offers',
  },
  {
    id: 'Accepted',
    name: 'Accepted',
  },
];

export const SORT_BY_ROLE = [
  {
    id: 'Allrole',
    name: 'All role',
  },
  {
    id: 'Admin',
    name: 'Admin',
  },
  {
    id: 'Employee',
    name: 'Employee',
  },
];

export const SORT_BY_ROLE_ADMIN = [
  {
    id: 'Allrole',
    name: 'All role',
  },
  {
    id: 'Admin',
    name: 'Admin',
  },
  { id: 'AdminL1', name: 'L1 Admin' },
  { id: 'AdminL2', name: 'L2 Admin' },
  {
    id: 'Employee',
    name: 'Employee',
  },
];

export const SORT_BY_ROLE_ADMIN_L1 = [
  {
    id: 'Allrole',
    name: 'All role',
  },
  { id: 'AdminL1', name: 'L1 Admin' },
  { id: 'AdminL2', name: 'L2 Admin' },
  {
    id: 'Employee',
    name: 'Employee',
  },
];

export const SORT_BY_ROLE_ADMIN_L2 = [
  {
    id: 'Allrole',
    name: 'All role',
  },
  { id: 'AdminL2', name: 'L2 Admin' },
  {
    id: 'Employee',
    name: 'Employee',
  },
];

export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\w\W]{8,}$/; // Minimum 8 characters, at least one special character, one letter and one number
export const PHONE_PATTERN = /^([0-9])+([0-9]{7,20})\b$/;
export const PHONE_PATTERN_FULL =
  /^(([0-9\ \+\_\-\,\.\^\*\?\$\^\#\(\)])|(ext|x)){9,20}$/;
export const SUBDOMAIN_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]+[a-zA-Z0-9]$/;
export const FILE_ACCEPT = {
  PDF: 'application/pdf, ',
  DOC: '.doc,.docx, ',
  DOCX: '.docx, ',
  CONTRACT: 'application/pdf',
  XLS: 'application/vnd.ms-excel, ',
  DOCUMENT: 'application/pdf, application/msword, application/vnd.ms-excel',
};

export const CONTRACT_SIGN_METHOD = [
  { title: 'Manually', subTitle: 'Download your contract to sign', value: 1 },
  {
    title: 'By Docusign ($10 per used)',
    subTitle: 'We will export your contract to PDF and send to Docusign',
    value: 2,
  },
];

export const DOCUMENT_PRIVACY = {
  All: { id: 1, value: 'All', label: 'All who join in project' },
  EXCEPT_CLIENT: { id: 2, value: 'ExceptClient', label: 'All except client' },
  EXCEPT_PARTNER: {
    id: 3,
    value: 'ExceptPartner',
    label: 'All except contractor',
  },
  EXCEPT_ALL: {
    id: 4,
    value: 'ExceptAll',
    label: 'All except',
  },
};

export const PRIVACY = {
  INCLUDE_CONTRACTOR: {
    id: 1,
    label: 'Include Contractor',
  },
  INCLUDE_CLIENT: {
    id: 2,
    label: 'Include Client',
  },
};

export const PRIVACY_LIST = Object.values(PRIVACY);

export const PAGE_TYPE = {
  OWN: 'own',
  ASSIGNED: 'assigned',
  SHARED: 'shared',
};

export const USER_ROLE = {
  ADMIN: 'Admin',
  EMPLOYEE: 'Employee',
  ADMINL1: 'AdminL1',
  ADMINL2: 'AdminL2',
};

export const SORT_BY_CONTRACTOR_RELATIONSHIP = [
  {
    id: 0,
    name: 'All Contractor',
  },
  {
    id: 1,
    name: 'Cooperation',
  },
];

export const USER_ROLE_DETAIL = {
  ADMIN: {
    id: 'Admin',
    name: 'Admin',
    priority: 1,
  },
  ADMIN_L1: {
    id: 'AdminL1',
    name: 'L1 Admin',
    priority: 2,
  },
  ADMIN_L2: {
    id: 'AdminL2',
    name: 'L2 Admin',
    priority: 3,
  },
  EMPLOYEE: {
    id: 'Employee',
    name: 'Employee',
    priority: 4,
  },
};

export const SORT_BY_RATING = [
  {
    id: 0,
    value: 0,
    label: '0',
  },
  {
    id: 5,
    value: 5,
    label: '5',
  },
  {
    id: 4,
    value: 4,
    label: '4',
  },
  {
    id: 3,
    value: 3,
    label: '3',
  },
  {
    id: 2,
    value: 2,
    label: '2',
  },
  {
    id: 1,
    value: 1,
    label: '1',
  },
];
