import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectCountries = () =>
  createSelector(getCommonState, (state) => state.getIn(['listCountry']));

const selectObjCountries = () =>
  createSelector(getCommonState, (state) => state.getIn(['objCountry']));

const selectCities = () =>
  createSelector(getCommonState, (state) => state.getIn(['listCity']));

const selectPhoneCodes = () =>
  createSelector(getCommonState, (state) => state.getIn(['listPhoneCode']));

const selectCategoriesSkills = () =>
  createSelector(getCommonState, (state) => state.getIn(['listCategorySkill']));

const selectCurrencies = () =>
  createSelector(getCommonState, (state) => state.getIn(['listCurrency']));

const selectRoleEmployee = () =>
  createSelector(getCommonState, (state) => state.getIn(['listRoleEmployee']));

const selectConfiguration = () =>
  createSelector(getCommonState, (state) => state.get('configuration'));

const selectNotification = () =>
  createSelector(getCommonState, (state) => state.get('notificationData'));

const selectUnreadNotification = () =>
  createSelector(getCommonState, (state) => state.get('unreadNotification'));

const selectSkills = () =>
  createSelector(getCommonState, (state) => state.get('skills')?.toJS());

const selectCategories = () =>
  createSelector(getCommonState, (state) => state.get('categories')?.toJS());

export {
  selectCountries,
  selectCities,
  selectPhoneCodes,
  selectCategoriesSkills,
  selectCurrencies,
  selectRoleEmployee,
  selectConfiguration,
  selectNotification,
  selectUnreadNotification,
  selectObjCountries,
  selectSkills,
  selectCategories,
};
