export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const FORGOT_PASSWORD = '/forgot-password';
export const VERIFY_EMPLOYEE = '/verify-employee/:id';
export const INVITE_PARTNER = '/invite-partner/:id';
export const API_DOCUMENT = '/api-document';

export const HOME = '/';

export const PROJECTS = '/projects';
export const PROJECT_DETAIL = '/project/detail/:id';

export const JOB_DETAIL = '/job/detail/:id';
export const JOB_ASSIGNED_DETAIL = '/job/assigned/detail/:id';
export const JOB_ASSIGNED = '/job/assigned';

export const NOTE_DETAIL = '/note/detail/:id';
export const NOTE_ASSIGN_DETAIL = '/note/assign/detail/:id';

export const DOCUMENT_DETAIL = '/document/detail/:id';
export const DOCUMENT_ASSIGN_DETAIL = '/document/assign/detail/:id';

export const PARTNERS = '/partners';
export const PARTNERS_PROFILE = '/partners/profile';
export const PARTNERS_SETTING = '/partners/setting';

export const CONTRACTS = '/contracts';
export const CONTRACT_DETAIL = '/contract/:id';

export const CLIENTS = '/clients';
export const CLIENT_SHARED = '/shared-client/:id';
export const CLIENT_JOB_SHARED = '/shared-client/job/:id';
export const CLIENT_NOTE_SHARED = '/shared-client/note/:id';
export const CLIENT_REMOVE = '/remove-client/:token';

export const PARTNERS_RELATIONSHIP = '/relationship/partners';

export const CLIENTS_RELATIONSHIP = '/relationship/clients';

export const EMPLOYEES_RELATIONSHIP = '/relationship/employees';

export const SUBSCRIPTIONS = '/subscriptions';

export const DYNAMIC_REPORT = '/reports';

export const PUBLIC_TASK_ASSIGN = '/assign-task/:token';

export const POLICY = '/policy-privacy';

export const TERM_AND_CONDITION = '/term-condition';
export const ABOUT_US = '/about-us';

export const INQUIRY = '/inquiry';

// Public routes
export const ASSIGN_NOTE_PUBLIC = '/public/assign/note/:token';
export const ASSIGN_ATTACHMENT_PUBLIC = '/public/assign/attachment/:token';
export const ASSIGN_CONTRACT_PUBLIC = '/public/assign/contract/:token';

export const DISABLED_FOR_PARTNER_LITE = [
    PROJECTS,
    PROJECT_DETAIL,
    PARTNERS,
    PARTNERS_RELATIONSHIP,
    EMPLOYEES_RELATIONSHIP,
    VERIFY_EMPLOYEE,
    DYNAMIC_REPORT
];