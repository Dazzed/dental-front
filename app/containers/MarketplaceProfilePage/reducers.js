import { createReducer } from 'redux-act';
import {
  dentistProfileRequest,
  dentistProfileSuccess,
  dentistProfileError
} from './actions';

const initialState = {
  dentist: null,
  isLoading: true,
  errorLoading: false
};

const dentistProfileReducer = {
  [dentistProfileSuccess]: (state, dentist) => {
    return {
      ...state,
      dentist,
      isLoading: false
    };
  },
  [dentistProfileError]: state => {
    return {
      ...state,
      isLoading: false,
      errorLoading: true
    };
  }
};

export default createReducer(dentistProfileReducer, initialState);
