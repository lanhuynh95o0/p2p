import React, { lazy } from 'react';

import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from 'components/Atoms/Icon';

const JobDetail = lazy(() => import('components/Pages/JobDetail'));
const JobAssignedDetail = lazy(() =>
  import('components/Pages/JobAssignedDetail')
);
const JobAssigned = lazy(() => import('components/Pages/AssignedJobs'));

const routes = [
  {
    path: routePath.JOB_ASSIGNED,
    component: JobAssigned,
    exact: true,
    name: routeName.JOB_ASSIGNED,
    showMenu: true,
    icon: IconCustom.Briefcase,
  },
  {
    path: routePath.JOB_DETAIL,
    component: JobDetail,
    exact: true,
    name: routeName.JOB_DETAIL,
    showMenu: false,
    icon: IconCustom.Folder,
  },
  {
    path: routePath.JOB_ASSIGNED_DETAIL,
    component: JobAssignedDetail,
    exact: true,
    name: routeName.JOB_ASSIGNED_DETAIL,
    showMenu: false,
    icon: IconCustom.Folder,
    matchPath: '/job/assigned/detail',
    parentPath: routePath.JOB_ASSIGNED,
  },
];

export default routes;
