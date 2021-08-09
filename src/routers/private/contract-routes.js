import React, { lazy } from 'react';
import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from 'components/Atoms/Icon';

const Contracts = lazy(() => import('components/Pages/Contracts'));
const ContractDetail = lazy(() => import('components/Pages/ContractDetail'));

const routes = [
  {
    path: routePath.CONTRACTS,
    component: Contracts,
    exact: true,
    name: routeName.CONTRACTS,
    showMenu: true,
    icon: IconCustom.Document,
  },
  {
    path: routePath.CONTRACT_DETAIL,
    matchPath: '/contract',
    parentPath: routePath.CONTRACTS,
    component: ContractDetail,
    exact: true,
    name: routeName.CONTRACT_DETAIL,
    showMenu: false,
  },
];

export default routes;
