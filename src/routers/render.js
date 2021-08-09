import React from 'react';
import { Route as RouteDom } from 'react-router-dom';
import { PrivateRoute } from 'components/Atoms';

import privateRoutes from './private';
import publicRoutes from './public';
import { get } from 'lodash';
import { DISABLED_FOR_PARTNER_LITE } from './route-path';
import { ACCOUNT_TYPE } from 'constants/account';

const renderRoutes = (isPrivate = false, partnerInfo = null) => {
  let routes = publicRoutes;
  let Route = RouteDom;

  if (isPrivate) {
    routes = privateRoutes;

    if (partnerInfo) {
      const accountType = get(partnerInfo, 'accountType');
      if (accountType == ACCOUNT_TYPE.PARTNER_LITE) {
        routes = routes.filter(r => !DISABLED_FOR_PARTNER_LITE.includes(r.path));
      }
    }

    Route = PrivateRoute;
    // Filter route by role
    routes = routes.filter(route => {
      if (!route.roles || !partnerInfo) {
        return route;
      }

      if (
        route.roles &&
        route.roles.find(role => role === get(partnerInfo, 'role'))
      ) {
        return route;
      }
    });
  }




  return routes.map(({ component: Component, ...rest }, idx) => (
    <Route {...rest} key={idx} render={(props) => <Component {...props} />}>
      <Component />
    </Route>
  ));
};

export default renderRoutes;
