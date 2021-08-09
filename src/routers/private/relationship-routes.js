import React, { lazy } from 'react';

import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { getRelationshipPartners } from 'states/partner-admin/actions';
import { selectRelationshipPartnerData } from 'states/partner-admin/selectors';
import { USER_ROLE } from 'constants/common';
import { IconCustom } from 'components/Atoms/Icon';

const PartnersRelationship = lazy(() => import('components/Pages/Partners'));

const ClientsRelationship = lazy(() =>
  import('components/Pages/ClientsRelationship')
);

const EmployeesRelationship = lazy(() =>
  import('components/Pages/EmployeesRelationship')
);

const routes = [
  // {
  //   path: routePath.PARTNERS_RELATIONSHIP,
  //   component: () => (
  //     <PartnersRelationship
  //       actionFetchData={getRelationshipPartners}
  //       partnerSelector={selectRelationshipPartnerData}
  //       breadcrumb={[
  //         { name: 'Relationship' },
  //         { name: routeName.PARTNERS_RELATIONSHIP },
  //       ]}
  //     />
  //   ),
  //   exact: true,
  //   name: routeName.PARTNERS_RELATIONSHIP,
  //   showMenu: true,
  // },
  {
    path: routePath.CLIENTS_RELATIONSHIP,
    component: ClientsRelationship,
    exact: true,
    name: routeName.CLIENTS_RELATIONSHIP,
    showMenu: true,
    icon: IconCustom.UserCommunity,
  },
  {
    path: routePath.EMPLOYEES_RELATIONSHIP,
    component: EmployeesRelationship,
    exact: true,
    name: routeName.EMPLOYEES_RELATIONSHIP,
    showMenu: true,
    icon: IconCustom.UserCommunity,
    roles: [USER_ROLE.ADMIN, USER_ROLE.ADMINL1, USER_ROLE.ADMINL2],
  },
];

export default routes;
