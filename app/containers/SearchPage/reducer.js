import { createReducer } from 'redux-act';

import {
  searchRequest,
  searchSuccess,
  searchError,
  specialtiesSuccess,
} from './actions';

const defaultState = {
  searchResults: [],
  filters: {
    searchQuery: '',
    distance: 5,
    sort: 'price',
    specialties: [],
    coordinates: {
      lat: 0,
      lng: 0
    },
  },
  specialtiesList: [],
  loadingResults: true
};

const searchReducer = {
  [searchRequest]: (state) => {
    return {
      ...state,
      loadingResults: true
    };
  },
  [searchSuccess]: (state, dentists) => {
    return {
      ...state,
      searchResults: dentists,
      loadingResults: false
    };
  },
  [specialtiesSuccess]: (state, specialtiesList) => {
    return {
      ...state,
      specialtiesList
    };
  }
};

export default createReducer(searchReducer, defaultState);
