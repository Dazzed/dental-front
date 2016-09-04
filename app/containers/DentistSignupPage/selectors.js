import get from 'lodash/get';
import { createSelector } from 'reselect';


const firstNameErrorSelector =
  state => get(state, 'form.dentist-signup.syncErrors.firstName');
const lastNameErrorSelector =
  state => get(state, 'form.dentist-signup.syncErrors.lastName');
const isFirstNameTouched =
  state => get(state, 'form.dentist-signup.fields.firstName.touched');
const isLastNameTouched =
  state => get(state, 'form.dentist-signup.fields.lastName.touched');


export const isInvalidNameSelector = createSelector(
  firstNameErrorSelector,
  lastNameErrorSelector,
  isFirstNameTouched,
  isLastNameTouched,
  (firstName, lastName, firstNameTouched, lastNameTouched) =>
    (!!(firstName || lastName) && (firstNameTouched || lastNameTouched))
);

