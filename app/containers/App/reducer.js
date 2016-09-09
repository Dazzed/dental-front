import {
  SET_AUTH_DATA,
  SET_USER_DATA,
  DENTIST_SPECIALTIES_SUCCESS,
} from './constants';


const initialState = {
  authData: false,
  currentUser: false,
  dentistSpecialties: [],
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

    default:
      return state;
  }
}
