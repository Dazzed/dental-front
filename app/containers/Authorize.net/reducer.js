import {
  REQUEST_TOKEN,
  SET_TOKEN,
} from './constants';


const initialState = {
  requesting: false,
  token: null,
};


function paymentFormReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        requesting: false,
        token: action.token,
      };

    case REQUEST_TOKEN:
      return {
        ...state,
        requesting: true,
      };
    default:
      return state;
  }
}


export default paymentFormReducer;


