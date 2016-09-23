import {
  SET_AUTH_DATA,
  SET_USER_DATA,
  DENTIST_SPECIALTIES_SUCCESS,
  SERVICES_REQUEST_SUCCESS,
  CHANGE_PAGE_TITLE,
} from './constants';

const initialState = {
  loggedIn: !!localStorage.jwtToken,
  authData: false,
  currentUser: false,
  dentistSpecialties: [],
  services: [],
  pageTitle: null,
};

export default function appReducer (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {

    case SET_AUTH_DATA:
      return {
        ...state,
        authData: payload.authData,
      };

    case SET_USER_DATA:
      return {
        ...state,
        currentUser: payload.currentUser,
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
