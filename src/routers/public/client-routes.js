import React, { lazy } from 'react';

import * as routePath from '../route-path';
import { PAGE_TYPE } from 'constants/common';
import SitePublic from 'components/Organisms/PublicPage';
import { getNoteShare } from 'states/note/actions';

const ProjectDetail = lazy(() =>
  import('components/Pages/SharedProjectDetail')
);
const JobDetail = lazy(() => import('components/Pages/SharedJobDetail'));
const NoteDetail = lazy(() => import('components/Pages/NoteDetail'));
const ClientReject = lazy(() => import('components/Pages/ClientReject'));
const PublicTaskAssign = lazy(() =>
  import('components/Pages/PublicTaskAssign')
);
const PolicyPrivacy = lazy(() => import('components/Pages/PolicyPrivacy'));
const AboutUs = lazy(() => import('components/Pages/AboutUs'));
const TermAndCondition = lazy(() =>
  import('components/Pages/TermAndCondition')
);

const PublicAssignNote = lazy(() =>
  import('components/Pages/Public/AssignNote')
);
const PublicAssignAttachment = lazy(() =>
  import('components/Pages/Public/AssignAttachment')
);

const PublicAssignContract = lazy(() =>
  import('components/Pages/Public/AssignContract')
);

const routes = [
  {
    path: routePath.CLIENT_SHARED,
    component: ProjectDetail,
    exact: true,
  },
  {
    path: routePath.CLIENT_JOB_SHARED,
    component: JobDetail,
    exact: true,
  },
  {
    path: routePath.CLIENT_NOTE_SHARED,
    component: () => (
      <SitePublic
        component={
          <NoteDetail
            pageType={PAGE_TYPE.SHARED}
            actionGetNote={getNoteShare}
          />
        }
      />
    ),
    exact: true,
  },
  {
    path: routePath.CLIENT_REMOVE,
    component: ClientReject,
    exact: true,
  },
  {
    path: routePath.PUBLIC_TASK_ASSIGN,
    component: PublicTaskAssign,
    exact: true,
  },
  {
    path: routePath.POLICY,
    component: PolicyPrivacy,
    exact: true,
    name: null,
    showMenu: false,
    icon: null,
  },
  {
    path: routePath.ABOUT_US,
    component: AboutUs,
    exact: true,
    name: null,
    showMenu: false,
    icon: null,
  },
  {
    path: routePath.TERM_AND_CONDITION,
    component: TermAndCondition,
    exact: true,
    name: null,
    showMenu: false,
    icon: null,
  },
  {
    path: routePath.ASSIGN_NOTE_PUBLIC,
    component: () => <SitePublic component={<PublicAssignNote />} />,
    exact: true,
  },
  {
    path: routePath.ASSIGN_ATTACHMENT_PUBLIC,
    component: () => <SitePublic component={<PublicAssignAttachment />} />,
    exact: true,
  },
  {
    path: routePath.ASSIGN_CONTRACT_PUBLIC,
    component: () => <SitePublic component={<PublicAssignContract />} />,
    exact: true,
  },
];

export default routes;
