import * as types from './constants';

export const getPartnersAll = (payload) => ({
  type: types.GET_PARTNER_ADMIN,
  payload,
});

export const getPartnersAllSuccess = (payload) => ({
  type: types.GET_PARTNER_ADMIN_SUCCESS,
  payload,
});

export const getRelationshipPartners = (payload) => ({
  type: types.GET_RELATIONSHIP_PARTNER,
  payload,
});

export const getRelationshipPartnersSuccess = (payload) => ({
  type: types.GET_RELATIONSHIP_PARTNER_SUCCESS,
  payload,
});
