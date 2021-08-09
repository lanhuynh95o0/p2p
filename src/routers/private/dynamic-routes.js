import { lazy } from 'react';
import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from 'components/Atoms/Icon';

const DynamicReport = lazy(() => import('components/Pages/DynamicReport'));

const routes = [
  {
    path: routePath.DYNAMIC_REPORT,
    component: DynamicReport,
    exact: true,
    name: routeName.DYNAMIC_REPORT,
    showMenu: true,
    icon: IconCustom.Assessment
  },
];

export default routes;
