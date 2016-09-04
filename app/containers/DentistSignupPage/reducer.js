import { fromJS } from 'immutable';

import {
  DENTIST_SIGNUP_SUCCESS,
} from './constants';


const initialState = fromJS({
  dentistCreated: false,
  fullName: '',
});


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case DENTIST_SIGNUP_SUCCESS:
      return state
        .set('dentistCreated', true)
        .set('fullName', action.payload.fullName);
    default:
      return state;
  }
}
