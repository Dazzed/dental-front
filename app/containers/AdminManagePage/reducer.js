import {
  FETCH_ACCOUNT_MANAGERS_SUCCESS,
  FETCH_ACCOUNT_MANAGERS_ERROR,
  SELECT_MANAGER,
  TOGGLE_ADDING_MANAGER,
  ADD_MANAGER_SUCCESS,
  TOGGLE_EDITING_MANAGER,
  EDIT_MANAGER_SUCCESS,
} from './constants';

const initialState = {
  managers: [],
  selectedManager: null,
  addingManager: false,
  editingManager: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_MANAGERS_SUCCESS: 
      return {
          ...state,
          managers: action.payload
      };
    case FETCH_ACCOUNT_MANAGERS_ERROR:
      return {
          ...state
      };
    case SELECT_MANAGER:
      return {
        ...state,
        selectedManager: action.payload
      };
    case TOGGLE_ADDING_MANAGER:
      return {
        ...state,
        addingManager: action.payload
      };
    case ADD_MANAGER_SUCCESS:
      return {
        ...state,
        managers: state.managers.concat(action.payload),
        addingManager: false,
      };
    case TOGGLE_EDITING_MANAGER:
      return {
        ...state,
        editingManager: action.payload
      }
    case EDIT_MANAGER_SUCCESS:
      let targetManagerIndex = state.managers.findIndex(m => m.id === action.payload.id);
      return {
        ...state,
        managers: [
          ...state.managers.slice(0,targetManagerIndex),
          action.payload,
          ...state.managers.slice(targetManagerIndex+1)
        ],
        editingManager: null,
      };
    default:
      return {
        ...state
      };
  }
}