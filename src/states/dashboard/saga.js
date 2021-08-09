import { call, takeLatest, all } from 'redux-saga/effects';
import { FETCH_ALL } from 'states/dashboard/constants';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { delay, put } from '@redux-saga/core/effects';
import {
  setClients,
  setLoading,
  setPartner,
  setProjects,
} from 'states/dashboard/actions';

const MAX_LENGTH_PROJECTS = 4;

function* fetchDashboard() {
  try {
    yield put(setLoading(true));
    const {
      data: { projects, partners, clients },
    } = yield call(() => axios.get(API.DASHBOARD.GET_ALL));

    const chunkProjects =
      projects.length > MAX_LENGTH_PROJECTS
        ? projects.slice(0, MAX_LENGTH_PROJECTS)
        : projects;

    yield all([
      put(setProjects(chunkProjects)),
      put(setPartner(partners)),
      put(setClients(clients)),
    ]);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  } finally {
    yield delay(500);
    yield put(setLoading(false));
  }
}

export default function* sagas() {
  yield takeLatest(FETCH_ALL, fetchDashboard);
}
