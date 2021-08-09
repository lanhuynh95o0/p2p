import React, { lazy } from 'react';

import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from '../../components/Atoms/Icon';

const MemberSubscriptions = lazy(() =>
  import('components/Pages/Subscriptions')
);

const routes = [
  {
    icon: IconCustom.Bookmark,
    path: routePath.SUBSCRIPTIONS,
    component: MemberSubscriptions,
    exact: true,
    name: routeName.SUBSCRIPTIONS,
    showMenu: true,
  },
];

export default routes;
