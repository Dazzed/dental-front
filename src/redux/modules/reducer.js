import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import { reducer as form } from 'redux-form';
import signup from './signup';
import currentUser from './currentUser';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  signup,
  currentUser,
});
