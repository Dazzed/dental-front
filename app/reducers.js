/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import appReducer from 'containers/App/reducer';
import dashboardReducer from 'containers/Dashboard/reducer';
import dentistSignupReducer from 'containers/DentistSignupPage/reducer';
import paymentFormReducer from 'containers/Authorize.net/reducer';
import myFamilyMembersReducer from 'containers/MyFamilyMembers/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer (asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    toastr: toastrReducer,
    global: appReducer,
    dentistSignup: dentistSignupReducer,
    dashboard: dashboardReducer,
    paymentForm: paymentFormReducer,
    myFamilyMembers: myFamilyMembersReducer,
    ...asyncReducers,
  });
}
