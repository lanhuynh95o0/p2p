import React from 'react';
import { createSelector } from 'reselect';
import { DOCUMENT } from 'states/document/constants';
import { JOB_DETAIL, PROJECT_DETAIL, PROJECTS } from 'routers/route-path';

const getDocumentState = (state) => state[DOCUMENT];

const getDocumentBreadcrumb = (documentDetails) => {
  if (!documentDetails) return [];

  const {
    file,
    job: { project, id: jobId, code: jobCode },
  } = documentDetails;

  return [
    { name: 'Projects', link: PROJECTS },
    documentDetails?.job && {
      name: project?.code,
      link: PROJECT_DETAIL.replace(':id', project?.id),
    },
    jobCode && {
      name: jobCode,
      link: JOB_DETAIL.replace(':id', jobId),
    },
    { name: file.displayName },
  ];
};

export const selectDocumentDetailBreadcrumb = () =>
  createSelector(getDocumentState, (state) =>
    getDocumentBreadcrumb(state.getIn(['documentDetails']))
  );
