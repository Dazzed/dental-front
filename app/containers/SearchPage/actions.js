import { createAction } from 'redux-act';

// SEARCH ACTIONS
const searchRequest = createAction('SEARCH_PAGE_SEARCH_REQUEST', (filters, specialtiesRequired) => {
  return {
    filters,
    specialtiesRequired
  };
});

const searchSuccess = createAction('SEARCH_PAGE_SEARCH_SUCCESS', dentists => {
  return dentists;
});

const searchError = createAction('SEARCH_PAGE_SEARCH_ERROR', errors => errors);

// SPECIALTIES ACTIONS
const specialtiesRequest = createAction('SEARCH_PAGE_SPECIALTIES_REQUEST');

const specialtiesSuccess = createAction('SEARCH_PAGE_SPECIALTIES_SUCCESS', specialtiesList => {
  return specialtiesList;
});

const countSuccess = createAction(
  'SEARCH_PAGE_DENTIST_COUNT_SUCCESS',
  totalDentistCount => totalDentistCount
);

const specialtiesError = createAction('SEARCH_PAGE_SPECIALTIES_ERROR', errors => {
  return {
    errors
  };
});

export {
  searchRequest,
  searchSuccess,
  searchError,
  specialtiesRequest,
  specialtiesSuccess,
  countSuccess,
  specialtiesError
};
