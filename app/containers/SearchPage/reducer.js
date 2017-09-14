import { createReducer } from 'redux-act';

import {
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
  specialtiesList: []
};

const searchReducer = {
  [searchSuccess]: (state, dentists) => {
    return {
      ...state,
      searchResults: dentists
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
