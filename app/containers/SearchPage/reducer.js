import { createReducer } from 'redux-act';

import {
  searchRequest,
  searchSuccess,
  searchError,
  specialtiesSuccess,
  countSuccess,
  updateFilter,
  resetFiltersAndUpdateSearch
} from './actions';

const defaultState = {
  searchResults: [],
  filters: {
    searchQuery: '',
    distance: null,
    sort: 'price',
    specialties: null,
  },
  specialtiesList: [],
  totalDentistCount: 0,
  loadingResults: true,
  errors: null
};

const searchReducer = {
  [searchRequest]: state => {
    return {
      ...state,
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
  }),
  [updateFilter]: (state, filter) => ({
    ...state,
    filters: {
      ...state.filters,
      [filter.name]: filter.value
    }
  }),
  [resetFiltersAndUpdateSearch]: (state, searchQuery) => ({
    ...state,
    filters: {
      ...defaultState.filters,
      searchQuery
    }
  })
};

export default createReducer(searchReducer, defaultState);
