import { createAction } from 'redux-act';

const dentistProfileRequest = createAction('MARKETPLACE_DENTIST_PROFILE_REQUEST', id => {
  return id;
});

const dentistProfileSuccess = createAction('MARKETPLACE_DENTIST_PROFILE_SUCCESS', dentist => {
  return dentist;
});

const dentistProfileError = createAction('MARKETPLACE_DENTIST_PROFILE_ERROR', () => {
  return '';
});

export {
  dentistProfileRequest,
  dentistProfileSuccess,
  dentistProfileError
};
