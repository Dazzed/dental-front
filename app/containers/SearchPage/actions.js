import { createAction } from 'redux-act';

const searchRequest = createAction('SEARCH_PAGE_SEARCH_REQUEST', filters => {
  return {
    filters
  };
});

const searchSuccess = createAction('SEARCH_PAGE_SEARCH_SUCCESS', dentists => {
  return dentists;
});

const searchError = createAction('SEARCH_PAGE_SEARCH_ERROR', errors => {
  return {
    errors
  };
});

export {
  searchRequest,
  searchSuccess,
  searchError
};
