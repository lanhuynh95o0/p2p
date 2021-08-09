import React, { lazy } from 'react';
import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from 'components/Atoms/Icon';

const Home = lazy(() => import('components/Pages/Home'));

const routes = [
  {
    path: routePath.HOME,
    component: Home,
    exact: true,
    name: routeName.HOME,
    showMenu: true,
    icon: IconCustom.Home,
  },
];

export default routes;
