import { createReducer } from 'redux-act';

import {
  searchRequest,
  searchSuccess,
  searchError,
  specialtiesSuccess,
  countSuccess,
} from './actions';

const defaultState = {
  searchResults: [],
  filters: {
    searchQuery: '',
    distance: null,
    sort: 'price',
    specialties: [],
    coordinates: {
      lat: 0,
      lng: 0
    },
  },
  specialtiesList: [],
  totalDentistCount: 0,
  loadingResults: true,
  errors: null
};

const searchReducer = {
  [searchRequest]: (state, payload) => {
    return {
      ...state,
      filters: payload.filters,
      loadingResults: true,
      errors: null
    };
  },
  [searchSuccess]: (state, dentists) => {
    return {
      ...state,
      searchResults: dentists,
      loadingResults: false,
      errors: null
    };
  },
  [searchError]: (state, errors) => {
    return {
      ...state,
      searchResults: [],
      loadingResults: false,
      errors
    };
  },
  [specialtiesSuccess]: (state, specialtiesList) => {
    return {
      ...state,
      specialtiesList
    };
  },
  [countSuccess]: (state, totalDentistCount) => ({
    ...state,
    totalDentistCount
  })
};

export default createReducer(searchReducer, defaultState);
