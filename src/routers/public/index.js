import { lazy } from 'react';

import * as routePath from '../route-path';
import routeClient from './client-routes';

const LoginPage = lazy(() => import('components/Pages/Auth'));
const SignUpPage = lazy(() => import('components/Pages/Auth/pages/SignUp'));
const VerifyEmployeePage = lazy(() =>
  import('components/Pages/VerifyEmployee')
);
const InvitePartnerPage = lazy(() =>
  import('components/Pages/InvitePartnerForJob')
);
const ForgotPasswordPage = lazy(() =>
  import('components/Pages/Auth/pages/ForgotPassword')
);
const ApiDocumentPage = lazy(() => import('components/Pages/ApiDocument'));
const routes = [
  {
    path: routePath.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    exact: true,
  },
  {
    path: routePath.LOGIN,
    component: LoginPage,
    exact: true,
  },
  {
    path: routePath.SIGNUP,
    component: SignUpPage,
    exact: true,
  },
  {
    path: routePath.VERIFY_EMPLOYEE,
    component: VerifyEmployeePage,
    exact: true,
  },
  {
    path: routePath.INVITE_PARTNER,
    component: InvitePartnerPage,
    exact: true,
  },
  {
    path: routePath.API_DOCUMENT,
    component: ApiDocumentPage,
    exact: true,
  },
  ...routeClient,
];

export default routes;
