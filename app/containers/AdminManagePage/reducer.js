import {
  FETCH_ACCOUNT_MANAGERS_SUCCESS,
  FETCH_ACCOUNT_MANAGERS_ERROR,
  SELECT_MANAGER,
  TOGGLE_ADDING_MANAGER,
  ADD_MANAGER_SUCCESS,
  TOGGLE_EDITING_MANAGER,
  EDIT_MANAGER_SUCCESS,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  TOGGLE_ADD_SERVICE,
} from './constants';

const initialState = {
  managers: null,
  selectedManager: null,
  addingManager: false,
  editingManager: null,
  services: [],
  addingService: false,
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
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload.data,
      };
    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.concat(action.payload),
        addingService: false,
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.filter(s => s.id !== action.payload.service.id ),
      };
    case TOGGLE_ADD_SERVICE:
      return {
        ...state,
        addingService: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}