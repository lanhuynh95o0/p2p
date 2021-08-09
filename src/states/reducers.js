import { combineReducers } from 'redux';

import { authReducer, authName } from './auth';
import { commonReducer, commonName } from './common';
import { partnerReducer, partnerName } from './partner';
import { clientReducer, clientName } from './client';
import { projectReducer, projectName } from './project';
import { employeeReducer, employeeName } from './employee';
import { jobReducer, jobName } from './job';
import { partnerAdminReducer, partnerAdminName } from './partner-admin';
import { dynamicReportReducer, dynamicReportName } from './dynamic-report';
import { noteReducer, noteName } from './note';
import { commentReducer, commentName } from './comment';
import { taskReducer, taskName } from './task';
import { contractReducer, contractName } from './contract';
import { appReducer, appName } from './app';
import { billingReducer, billingName } from './billing';
import { dashboardReducer, dashboardName } from './dashboard';
import { documentReducer, DOCUMENT as documentName } from './document';
import { inquiryReducer, inquiryName } from './inquiry';

export default combineReducers({
  [authName]: authReducer,
  [commonName]: commonReducer,
  [partnerName]: partnerReducer,
  [projectName]: projectReducer,
  [clientName]: clientReducer,
  [employeeName]: employeeReducer,
  [partnerAdminName]: partnerAdminReducer,
  [jobName]: jobReducer,
  [dynamicReportName]: dynamicReportReducer,
  [noteName]: noteReducer,
  [commentName]: commentReducer,
  [taskName]: taskReducer,
  [contractName]: contractReducer,
  [appName]: appReducer,
  [billingName]: billingReducer,
  [dashboardName]: dashboardReducer,
  [documentName]: documentReducer,
  [inquiryName]: inquiryReducer,
});
