import get from 'lodash/get';
import { getItem } from 'utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,
  DENTIST_SPECIALTIES_SUCCESS,
  SERVICES_REQUEST_SUCCESS,
  CHANGE_PAGE_TITLE,
} from './constants';

const initialState = {
  loggedIn: !!getItem('auth_token'),
  currentUser: false,
  dentistSpecialties: [],
  services: [],
  pageTitle: null,
};

export default function appReducer (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {

    case SET_AUTH_STATE:
      return {
        ...state,
        loggedIn: payload.newAuthState,
      };

    case SET_USER_DATA:
      return {
        ...state,
        currentUser:
          (payload.currentUser === false)
            ? false
            : {
              ...payload.currentUser,
              phone: get(payload, 'currentUser.phoneNumbers[0].number'),
            }
      };

    case DENTIST_SPECIALTIES_SUCCESS:
      return {
        ...state,
        dentistSpecialties: payload.data,
      };

    case SERVICES_REQUEST_SUCCESS:
      return {
        ...state,
        services: payload.data,
      };

    case CHANGE_PAGE_TITLE:
      return {
        ...state,
        pageTitle: payload,
      };

    default:
      return state;
  }
}
