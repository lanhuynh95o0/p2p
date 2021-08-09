import React from 'react';
import homeRoutes from 'routers/private/home-routes';
import projectRoutes from 'routers/private/project-routes';
import jobRoutes from 'routers/private/job-routes';
import partnerRoutes from 'routers/private/partner-routes';
import relationshipRoutes from 'routers/private/relationship-routes';
import contractsRoutes from 'routers/private/contract-routes';
import subscriptionRoutes from 'routers/private/subscription-routes';
import dynamicRoutes from 'routers/private/dynamic-routes';
import inquiryRoutes from 'routers/private/inquiry-routes';
import { IconCustom } from 'components/Atoms/Icon';

export default [
  ...homeRoutes,
  ...projectRoutes,
  ...jobRoutes,
  ...partnerRoutes,
  ...relationshipRoutes,
  ...contractsRoutes,
  ...subscriptionRoutes,
  ...dynamicRoutes,
  ...inquiryRoutes,
];
