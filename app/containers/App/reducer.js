import get from 'lodash/get';
import { getItem } from 'utils/localStorage';

import {
  SET_AVATAR,
} from 'containers/Dashboard/constants';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,
  SERVICES_REQUEST_SUCCESS,
  CHANGE_PAGE_TITLE,
} from './constants';


const initialState = {
  loggedIn: !!getItem('auth_token'),
  currentUser: false,
  services: [],
  pageTitle: null,
};

export default function appReducer (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {

    case SET_AVATAR:
      if (action.userId === state.currentUser.id) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            avatar: action.avatar,
          },
        };
      }
      return state;

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
              address: get(payload, 'currentUser.addresses[0].value'),
            }
      };

    case SERVICES_REQUEST_SUCCESS:
      return {
        ...state,
        services: payload.data.sort((serviceA, serviceB) => {
          const serviceAName = serviceA.name.toLowerCase();
          const serviceBName = serviceB.name.toLowerCase();

          if (serviceAName < serviceBName) {
            return -1;
          }
          else if (serviceAName > serviceBName) {
            return 1;
          }
          return 0; // serviceAName === serviceBName
        }),
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
