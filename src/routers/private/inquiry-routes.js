import React, { lazy } from 'react';

import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from '../../components/Atoms/Icon';

const Inquiry = lazy(() => import('components/Pages/Inquiry'));

const routes = [
  {
    icon: IconCustom.Bookmark,
    path: routePath.INQUIRY,
    component: Inquiry,
    exact: true,
    name: routeName.INQUIRY,
    showMenu: true,
  },
];

export default routes;
