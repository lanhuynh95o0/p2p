import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import commonSaga from './common/saga';
import partnerSaga from './partner/saga';
import projectSaga from './project/saga';
import clientSaga from './client/saga';
import employeeSaga from './employee/saga';
import jobSaga from './job/saga';
import partnerAdminSaga from './partner-admin/saga';
import dynamicReportSaga from './dynamic-report/saga';
import noteSaga from './note/saga';
import commentSaga from './comment/saga';
import taskSaga from './task/saga';
import contractSaga from './contract/saga';
import billingSaga from './billing/saga';
import dashboardSaga from './dashboard/saga';
import documentSaga from './document/saga';
import inquirySaga from './inquiry/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    commonSaga(),
    partnerSaga(),
    clientSaga(),
    projectSaga(),
    employeeSaga(),
    partnerAdminSaga(),
    dynamicReportSaga(),
    jobSaga(),
    noteSaga(),
    commentSaga(),
    taskSaga(),
    contractSaga(),
    billingSaga(),
    dashboardSaga(),
    documentSaga(),
    inquirySaga(),
  ]);
}
