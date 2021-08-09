import * as routePath from 'routers/route-path';
import * as routeName from 'routers/route-name';
import { IconCustom } from 'components/Atoms/Icon';
import React, { lazy } from 'react';

const DocumentDetail = lazy(() => import('components/Pages/DocumentDetail'));

const documentRoutes = [
  {
    path: routePath.DOCUMENT_DETAIL,
    component: DocumentDetail,
    exact: true,
    name: routeName.DOCUMENT_DETAIL,
    showMenu: false,
    icon: IconCustom.Folder,
  },
  {
    path: routePath.DOCUMENT_ASSIGN_DETAIL,
    component: () => <DocumentDetail type="assign" />,
    exact: true,
    showMenu: false,
  },
];
export default documentRoutes;
