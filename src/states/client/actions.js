import * as types from './constants';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import axiosRoot from 'axios';

let checkClientNameAjax = null;

export const getClients = (payload) => ({
  type: types.GET_CLIENTS,
  payload,
});

export const getClientsSuccess = (payload) => ({
  type: types.GET_CLIENTS_SUCCESS,
  payload,
});

export const getClientDetail = (payload, callbackSuccess) => ({
  type: types.GET_CLIENT_DETAIL,
  payload,
  callbackSuccess
});

export const getClientDetailSuccess = (payload) => ({
  type: types.GET_CLIENT_DETAIL_SUCCESS,
  payload,
});

export const createClient = (payload, callbackSuccess) => ({
  type: types.CREATE_CLIENT,
  payload,
  callbackSuccess,
});

export const updateClient = (payload, callbackSuccess) => ({
  type: types.UPDATE_CLIENT,
  payload,
  callbackSuccess,
});

export const deleteClient = (payload, callbackSuccess) => ({
  type: types.DELETE_CLIENT,
  payload,
  callbackSuccess,
});

export const clientReject = (payload, callbackSuccess, callbackFail) => ({
  type: types.CLIENT_REJECT,
  payload,
  callbackSuccess,
  callbackFail,
});

export const checkClientName = (payload, callbackSuccess, callbackFail) => ({
  type: types.CHECK_CLIENT_NAME,
  payload,
  callbackSuccess,
  callbackFail,
});
