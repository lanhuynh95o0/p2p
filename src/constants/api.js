const API_DOMAIN = process.env.REACT_APP_API_ROOT;
export default API_DOMAIN;

export const API = {
  USER_INFO: 'buyers/me',
  VERIFY_EMAIL_OR_PHONE: 'users/register/confirm',
  COMMON_COUNTRY: 'common/countries',
  COMMON_PHONE_CODE: 'common/phones',
  COMMON_SKILLS: 'common/skills',
  REGISTER_USER: 'users',
  INVITE_USER: 'users/invite',
  REGISTER_INVITE_USER: 'users/invite/register',
  LOGIN: 'users/login',
  REQUEST_RESET_PASSWORD: 'users/request-reset-password',
  REQUEST_CONFIRM_USER: 'users/confirm',
  RESET_PASSWORD: 'users/reset-password',
  PARTNER_PROFILE: 'partners',
  CLIENT: 'clients',
  PARTNER_EMPLOYEE: 'partners/employees',
  FILE: 'files',
  PROJECT: 'projects',
  PROJECT_OWN: 'projects/own',
  PROJECT_INVITE: 'projects/client/shared',
  JOB: 'jobs',
  PARTNER_ALL: 'partners/all',
  DYNAMIC_REPORT_PARTNER: 'reports/participants',
  DYNAMIC_REPORT_PROJECT: 'reports/projects',
  DYNAMIC_REPORT_JOB: 'reports/jobs',
  NOTE: 'notes',
  COMMENT: 'comments',
  COMMENT_ANONYMOUS: 'comments/anonymous',
  TASK: 'tasks',
  CONTRACT: 'contracts',
  DYNAMIC_REPORT_EXPORT_CSV: 'reports/csv',
  BILLINGS_SUBSCRIPTIONS: 'billings/subscriptions',
  STRIPE_KEY: 'billings/subscriptions/key',
  BILLINGS_DOCUSIGN: 'billings/intents',
  BILLINGS_SUBSCRIPTION_DETAIL: 'billings/subscriptions',
  SEND_CONTACT: '/inquiries',
  CLIENT_FROM_INQUIRY: (id) => `/inquiries/${id}/client`,

  FILES: {
    UPDATE_FILE: (id) => `/files/${id}`,
    GET_JOB_FILE: (id) => `/files/${id}`,
    DELETE_FILE: (id) => `/files/${id}`,
    UPDATE_JOB_FILE: (jobId, fileId) => `/jobs/${jobId}/documents/${fileId}`,
  },

  PROJECTS: {
    GET_FINANCE_REPORT: (id) => `/projects/${id}/reports`,
    SAVE_FINANCE_REPORT: '/projects/reports',
    PROJECT_EMPLOYEE: (id) => `projects/employee/${id}`,
  },

  DASHBOARD: {
    GET_ALL: '/partners/dashboard',
  },
  REQUEST_GET_EMAIL_BY_PHONE: '/users/phone',
  GET_EMAIL_BY_PHONE: '/users/phone/confirm',
  PUBLIC_ASSIGNED_TASK_DETAIL: '/tasks/assigned/:token',
  PUBLIC_UPDATE_ASSIGNED_TASK: '/tasks/assigned',
  GET_ROLE_EMPLOYEE: '/users/roles',
  CREATE_CONTRACT_FROM_TEMPLATE: '/contracts/template',
  UPDATE_CONTRACT_FROM_TEMPLATE: (id) => `/contracts/template/${id}/update`,

  GET_COMPANY_ADDRESS: 'configurations/companyAddress',
  GET_CONTACT_EMAIL: 'configurations/contactEmails',
  GET_CONTACT_PHONE: 'configurations/contactPhones',
  GET_CONTACT_POLICY: 'configurations/policies',
  GET_CONTACT_TERM_AND_CONDITION: 'configurations/terms',
  GET_ABOUT_US: 'configurations/aboutUs',
  ADD_EMPLOYEE_TO_PROJECT: 'partners/employees/:userId/projects/:projectId',

  GET_NOTIFICATION_PAGING: 'notifications',
  COUNT_UNREAD_NOTIFICATIONS: 'notifications/unread',

  MARK_NOTIFICATION_READ: 'notifications/:id/read',
  MARK_ALL_NOTIFICATION_READ: 'notifications/read-all',
  DELETE_NOTIFICATION: 'notifications/:id',
  DELETE_ALL_NOTIFICATION: 'notifications/delete-all',

  REGISTER_ONESIGNAL: 'notifications/register-device',

  INQUIRY: 'inquiries',

  VALIDATE_CLIENT_NAME: '/clients/validate/name',

  GENERATE_API_KEY: 'configurations/secrets',
  ADMIN_CATEGORIES: 'admins/categories',
  ADMIN_SKILL: 'admins/skills',
};
