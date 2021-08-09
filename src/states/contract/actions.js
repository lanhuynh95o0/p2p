import * as types from './constants';

export const createContract = (payload, callbackSuccess) => ({
  type: types.CREATE_CONTRACT,
  payload,
  callbackSuccess,
});

export const updateContract = (payload, callbackSuccess) => ({
  type: types.UPDATE_CONTRACT,
  payload,
  callbackSuccess,
});

export const removeContract = (payload, callbackSuccess) => ({
  type: types.REMOVE_CONTRACT,
  payload,
  callbackSuccess,
});

export const getContract = (payload, callbackSuccess, callbackFail) => ({
  type: types.GET_CONTRACT,
  payload,
  callbackSuccess,
  callbackFail,
});

export const getContractPath = (payload, callbackSuccess) => ({
  type: types.GET_CONTRACT_PATH,
  payload,
  callbackSuccess,
});

export const signContract = (payload, callbackSuccess) => ({
  type: types.SIGN_CONTRACT,
  payload,
  callbackSuccess,
});

export const signContractDocusign = (payload, callbackSuccess) => ({
  type: types.SIGN_CONTRACT_DOCUSIGN,
  payload,
  callbackSuccess,
});

export const getContracts = (payload) => ({
  type: types.GET_CONTRACTS,
  payload,
});

export const getContractsSuccess = (payload) => ({
  type: types.GET_CONTRACTS_SUCCESS,
  payload,
});

export const verifyContract = (payload, callbackSuccess) => ({
  type: types.VERIFY_CONTRACT,
  payload,
  callbackSuccess,
});

export const createContractFromTemplate = (payload, callbackSuccess) => ({
  type: types.CREATE_CONTRACT_FROM_TEMPLATE,
  payload,
  callbackSuccess,
});

export const updateContractFromTemplate = (payload, callbackSuccess) => ({
  type: types.UPDATE_CONTRACT_FROM_TEMPLATE,
  payload,
  callbackSuccess,
});
