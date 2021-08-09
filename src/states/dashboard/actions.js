import {
  FETCH_ALL,
  SET_CLIENTS,
  SET_LOADING,
  SET_PARTNERS,
  SET_PROJECTS,
} from 'states/dashboard/constants';

export const setProjects = (payload) => ({
  type: SET_PROJECTS,
  payload,
});

export const setPartner = (payload) => ({
  type: SET_PARTNERS,
  payload,
});

export const setClients = (payload) => ({
  type: SET_CLIENTS,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const fetchAll = (payload) => ({
  type: FETCH_ALL,
  payload,
});
