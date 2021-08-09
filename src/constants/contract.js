export const CONTRACT_PRINCIPLE_SIGN = 'Principle Signed';
export const CONTRACT_STATUS_CLASS = {
  Accepted: {
    class: 'text-success',
    classBg: 'bg-success-light',
    name: 'Accepted',
  },
  Signed: {
    class: 'text-success',
    classBg: 'bg-success-light',
    name: 'Signed',
  },
  Negotiating: {
    class: 'text-warning',
    classBg: 'bg-warning-light',
    name: 'Negotiating',
  },
  Rejected: {
    class: 'text-danger',
    classBg: 'bg-danger-light',
    name: 'Rejected',
  },
  Draft: { class: 'text-dark-gray', classBg: '', name: 'Draft' },
  Pending: {
    class: 'text-warning',
    classBg: 'bg-warning-light',
    name: 'Pending',
  },
  [CONTRACT_PRINCIPLE_SIGN]: {
    class: 'text-warning',
    classBg: 'bg-warning-light',
    name: 'Principle Signed',
    code: 'PrincipleSigned',
  },
};

export const CONTRACT_SIGN_TYPE = {
  MANUALLY: { ID: 1, NAME: 'Manually' },
  DOCUSIGN: { ID: 2, NAME: 'DocuSign' },
};
