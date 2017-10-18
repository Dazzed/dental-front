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

const dayOrder = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

const dentistProfileReducer = {
  [dentistProfileSuccess]: (state, dentist) => {
    dentist.dentistInfo.workingHours = dentist.dentistInfo.workingHours.sort((A, B) => {
      return dayOrder[A.day] - dayOrder[B.day];
    });
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
