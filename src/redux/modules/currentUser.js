const LOAD = 'redux-example/currentUser/LOAD';
const LOAD_SUCCESS = 'redux-example/currentUser/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/currentUser/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.currentUser && globalState.currentUser.loaded;
}

export function load(userId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/user/load/${userId}`) // params not used, just shown as demonstration
  };
}
