import {
  REQUEST_PAYMENT_BILL,
  SET_BILL,
} from './constants';


const initialState = {
  requesting: false,
};


function paymentFormReducer (state = initialState, action) {
  switch (action.type) {
    case SET_BILL:
      return {
        ...state,
        requesting: false,
      };

    case REQUEST_PAYMENT_BILL:
      return {
        ...state,
        requesting: true,
      };
    default:
      return state;
  }
}


export default paymentFormReducer;

