import {
  REQUEST_CARD_INFO,
  REQUEST_CHARGE,
  SET_CARD_INFO,
  SET_ERROR,
  CLEAR_DATA,
  PAYMENT_DONE,
  OPEN_FORM,
  SET_PENDING_AMOUNT,
} from './constants';


/**
 * State will only handle one related data to control only one payment.
 *
 * Fields:
 *  * charging: Set to true when try to charge the subscription.
 *  * card: Card info null if no card available.
 *  * requested: Set to true when card info was requested.
 *  * requesting: Set to true when collecting credit card info.
 *  * error: Error message from authorize.
 *  * open: Tell component to show form.
 */
const initialState = {
  card: null,
  details: null,
  error: null,
  charging: false,
  requested: false,
  requesting: false,
  open: false,
  userId: null,
  amounts: {},
};


function paymentFormReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_CARD_INFO:
      return {
        ...state,
        requesting: true,
      };
    case REQUEST_CHARGE:
      return {
        ...state,
        charging: true,
      };
    case OPEN_FORM:
      return {
        ...state,
        open: true,
        userId: action.userId,
      };
    case SET_CARD_INFO:
      return {
        ...state,
        card: action.data ? action.data.info : null,
        details: action.data ? action.data.details : null,
        requesting: false,
        requested: true,
      };
    case SET_ERROR:
      return {
        ...state,
        requesting: false,
        requested: true,
        charging: false,
        error: action.error,
      };
    case PAYMENT_DONE:
      return {
        ...initialState,
        amounts: {
          ...state.amounts,
          [action.userId]: 0,
        },
      };
    case CLEAR_DATA:
      return {
        ...initialState,
        amounts: state.amounts,
      };
    case SET_PENDING_AMOUNT:
      return {
        ...state,
        amounts: {
          ...state.amounts,
          [action.userId]: action.amount,
        },
      };
    default:
      return state;
  }
}


export default paymentFormReducer;


