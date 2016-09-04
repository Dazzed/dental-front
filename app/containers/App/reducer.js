import { fromJS } from 'immutable';

import {
  SET_AUTH_DATA,
  SET_USER_DATA,
  DENTIST_SPECIALTIES_SUCCESS,
} from './constants';


const initialState = fromJS({
  authData: false,
  currentUser: false,
  dentistSpecialties: [],
});

export default function appReducer (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {

    case SET_AUTH_DATA:
      return state.set('authData', payload.authData);

    case SET_USER_DATA:
      return state.set('currentUser', payload.currentUser);

    case DENTIST_SPECIALTIES_SUCCESS:
      return state.set('dentistSpecialties', fromJS(payload.data));

    default:
      return state;
  }
}
