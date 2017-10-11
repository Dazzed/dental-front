import { createReducer } from 'redux-act';
import {
  dentistProfileSuccess,
  dentistProfileError,
  resetDentist
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
  },
  [resetDentist]: state => {
    return {
      ...initialState
    };
  },
};

export default createReducer(dentistProfileReducer, initialState);
