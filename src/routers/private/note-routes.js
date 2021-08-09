import React, { lazy } from 'react';

import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { PAGE_TYPE } from 'constants/common';

const NoteDetail = lazy(() => import('components/Pages/NoteDetail'));

const routes = [
  {
    path: routePath.NOTE_DETAIL,
    component: NoteDetail,
    exact: true,
    name: routeName.NOTE_DETAIL,
    showMenu: false,
  },
  {
    path: routePath.NOTE_ASSIGN_DETAIL,
    component: () => <NoteDetail pageType={PAGE_TYPE.ASSIGNED} />,
    exact: true,
    showMenu: false,
  },
];

export default routes;
