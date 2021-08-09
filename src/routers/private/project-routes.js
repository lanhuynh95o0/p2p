import React, { lazy } from 'react';

import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from 'components/Atoms/Icon';

const Projects = lazy(() => import('components/Pages/Projects'));
const ProjectDetail = lazy(() => import('components/Pages/ProjectDetail'));

const routes = [
  {
    path: routePath.PROJECTS,
    component: Projects,
    exact: true,
    name: routeName.PROJECTS,
    showMenu: true,
    icon: IconCustom.Folder,
  },
  {
    path: routePath.PROJECT_DETAIL,
    component: ProjectDetail,
    exact: true,
    name: routeName.PROJECT_DETAIL,
    showMenu: false,
    matchPath: '/project/detail',
    parentPath: routePath.PROJECTS,
  },
];

export default routes;
