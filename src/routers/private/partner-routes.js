import React, { lazy } from 'react';
import * as routePath from '../route-path';
import * as routeName from '../route-name';
import { IconCustom } from 'components/Atoms/Icon';

const Partners = lazy(() => import('components/Pages/Partners'));
const PartnersSetting = lazy(() =>
  import('components/Pages/Partners/setting')
);
const PartnersProfile = lazy(() =>
  import('components/Pages/PublicProfilePartner')
);

const routes = [
  {
    path: routePath.PARTNERS,
    component: Partners,
    exact: true,
    name: routeName.PARTNERS,
    showMenu: true,
    icon: IconCustom.UserCommunity,
  },
  {
    path: routePath.PARTNERS_SETTING,
    component: PartnersSetting,
    exact: true,
    name: routeName.PARTNERS_SETTING,
    showMenu: false,
    icon: IconCustom.UserCommunity,
  },
  {
    path: routePath.PARTNERS_PROFILE,
    component: PartnersProfile,
    exact: true,
    name: routeName.PARTNERS_PROFILE,
    showMenu: false,
    icon: IconCustom.UserCommunity,
  },
];

export default routes;
