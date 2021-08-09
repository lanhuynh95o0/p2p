import homeRoutes from './home-routes';
import projectRoutes from './project-routes';
import jobRoutes from './job-routes';
import noteRoutes from './note-routes';
import partnerRoutes from './partner-routes';
import relationshipRoutes from './relationship-routes';
import contractsRoutes from './contract-routes';
import subscriptionRoutes from './subscription-routes';
import dynamicRoutes from './dynamic-routes';
import documentRoutes from 'routers/private/document-routes';
import inquiryRoutes from 'routers/private/inquiry-routes';

const routes = [
  ...homeRoutes,
  ...projectRoutes,
  ...jobRoutes,
  ...noteRoutes,
  ...partnerRoutes,
  ...relationshipRoutes,
  ...contractsRoutes,
  ...subscriptionRoutes,
  ...dynamicRoutes,
  ...documentRoutes,
  ...inquiryRoutes,
];
export default routes;
