import { createReducer } from 'redux-act';

import {
  searchSuccess,
  searchError
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
  }
};

const searchReducer = {
  [searchSuccess]: (state, dentists) => {
    return {
      ...state,
      searchResults: dentists
    };
  }
};

export default createReducer(searchReducer, defaultState);
