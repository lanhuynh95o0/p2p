import { fromJS } from 'immutable';
import { uniq } from 'lodash';
import * as types from './constants';

const initState = fromJS({
  listCountry: [],
  objCountry: {},
  listCity: [],
  listPhoneCode: [],
  listCategorySkill: [],
  listCurrency: [],
  listRoleEmployee: [],
  configuration: null,
  notificationData: null,
  unreadNotification: null,
  skills: [],
  categories: [],
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_COUNTRIES_SUCCESS: {
      return state
        .set('listCountry', payload.arr)
        .set('objCountry', payload.obj);
    }
    case types.GET_CITIES_SUCCESS: {
      return state.set(
        'listCity',
        payload.map((item) => ({ name: item, id: item }))
      );
    }
    case types.GET_PHONE_CODES_SUCCESS: {
      return state.set(
        'listPhoneCode',
        uniq(payload).map((item) => ({ name: `(${item})`, id: item }))
      );
    }
    case types.GET_CATEGORIES_SKILLS_SUCCESS: {
      return state.set('listCategorySkill', payload);
    }
    case types.GET_CURRENCIES_SUCCESS: {
      return state.set('listCurrency', payload);
    }
    case types.GET_ROLE_EMPLOYEE_SUCCESS: {
      return state.set('listRoleEmployee', payload);
    }
    case types.GET_CONFIGURATION_SUCCESS: {
      return state.set('configuration', payload);
    }
    case types.GET_NOTIFICATION_PAGING_SUCCESS: {
      return state.set('notificationData', payload);
    }
    case types.COUNT_UNREAD_NOTIFICATIONS_SUCCESS: {
      return state.set('unreadNotification', payload);
    }
    case types.UPDATE_NOTIFICATION_DATA: {
      const { notificationData, isReadAll } = payload;
      return state
        .set('notificationData', notificationData)
        .set(
          'unreadNotification',
          isReadAll ? 0 : state.get('unreadNotification') - 1
        );
    }
    case types.GET_SKILLS_SUCCESS: {
      return state.set('skills', fromJS(payload));
    }
    case types.GET_CATEGORIES_SUCCESS: {
      return state.set('categories', fromJS(payload));
    }
    default:
      return state;
  }
};
