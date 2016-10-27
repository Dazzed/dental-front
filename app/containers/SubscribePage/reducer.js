import {
  SET_BILL,
} from './constants';


const initialState = {
  bill: {},
};


function subscribeReducer (state = initialState, action) {
  switch (action.type) {
    case SET_BILL:
      return {
        ...state,
        bill: action.bill,
      };

    default:
      return state;
  }
}


export default subscribeReducer;
