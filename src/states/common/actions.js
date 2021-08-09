import * as types from './constants';

export const callActionWithStatus = (
  status,
  payload,
  successCallback,
  errorCallback
) => ({
  type: status,
  payload,
  successCallback,
  errorCallback,
});

export const getCities = (payload) => ({
  type: types.GET_CITIES,
  payload,
});

export const getCitiesSuccess = (payload) => ({
  type: types.GET_CITIES_SUCCESS,
  payload,
});

export const getCountries = (isIncludeInActive) => ({
  type: types.GET_COUNTRIES,
  isIncludeInActive,
});

export const getCountriesSuccess = (payload) => ({
  type: types.GET_COUNTRIES_SUCCESS,
  payload,
});

export const getPhoneCodes = () => ({
  type: types.GET_PHONE_CODES,
});

export const getPhoneCodesSuccess = (payload) => ({
  type: types.GET_PHONE_CODES_SUCCESS,
  payload,
});

export const getCategoriesSkills = () => ({
  type: types.GET_CATEGORIES_SKILLS,
});

export const getCategoriesSkillsSuccess = (payload) => ({
  type: types.GET_CATEGORIES_SKILLS_SUCCESS,
  payload,
});

export const getCurrencies = () => ({
  type: types.GET_CURRENCIES,
});

export const getCurrenciesSuccess = (payload) => ({
  type: types.GET_CURRENCIES_SUCCESS,
  payload,
});

export const removeFile = (payload, callbackSuccess) => ({
  type: types.REMOVE_FILE,
  payload,
  callbackSuccess,
});

export const uploadFile = (payload, config, callbackSuccess, folder) => ({
  type: types.UPLOAD_FILE,
  payload,
  config,
  callbackSuccess,
  folder,
});

export const updateFile = (id, payload, callbackSuccess) => ({
  type: types.UPDATE_FILE,
  id,
  payload,
  callbackSuccess,
});

export const downloadFile = (payload) => ({
  type: types.DOWNLOAD_FILE,
  payload,
});

export const removeBulkFile = (payload, callbackSuccess) => ({
  type: types.REMOVE_BULK_FILE,
  payload,
  callbackSuccess,
});

export const getRoleEmployee = () => ({
  type: types.GET_ROLE_EMPLOYEE,
});

export const getRoleEmployeeSuccess = (payload) => ({
  type: types.GET_ROLE_EMPLOYEE_SUCCESS,
  payload,
});

export const getConfiguration = () => ({
  type: types.GET_CONFIGURATION,
});

export const getConfigurationSuccess = (payload) => ({
  type: types.GET_CONFIGURATION_SUCCESS,
  payload,
});

export const getNotificationPaging = (payload) => ({
  type: types.GET_NOTIFICATION_PAGING,
  payload,
});

export const getNotificationPagingSuccess = (payload) => ({
  type: types.GET_NOTIFICATION_PAGING_SUCCESS,
  payload,
});

export const countUnreadNotifications = () => ({
  type: types.COUNT_UNREAD_NOTIFICATIONS,
});

export const countUnreadNotificationsSuccess = (payload) => ({
  type: types.COUNT_UNREAD_NOTIFICATIONS_SUCCESS,
  payload,
});

export const markNotificationRead = (payload) => ({
  type: types.MARK_NOTIFICATION_READ,
  payload,
});

export const markAllNotificationRead = (payload) => ({
  type: types.MARK_ALL_NOTIFICATION_READ,
  payload,
});

export const updateNotificationData = (payload) => ({
  type: types.UPDATE_NOTIFICATION_DATA,
  payload,
});

export const deleteNotification = (payload) => ({
  type: types.DELETE_NOTIFICATION,
  payload,
});

export const deleteAllNotification = (payload) => ({
  type: types.DELETE_ALL_NOTIFICATION,
});

export const generateAPIKey = (successCallback, errorCallback) => ({
  type: types.GENERATE_API_KEY,
  successCallback,
  errorCallback,
});

export const getSkills = (payload, callbackSuccess) => ({
  type: types.GET_SKILLS,
  payload,
  callbackSuccess,
});

export const getSkillsSuccess = (payload, callbackSuccess) => ({
  type: types.GET_SKILLS_SUCCESS,
  payload,
  callbackSuccess,
});

export const getCategories = (payload, callbackSuccess) => ({
  type: types.GET_CATEGORIES,
  payload,
  callbackSuccess,
});

export const getCategoriesSuccess = (payload, callbackSuccess) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload,
  callbackSuccess,
});
