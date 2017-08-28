import { 
  CHANGE_PAGE_TITLE,
  FETCH_ACCOUNT_MANAGERS,
  SELECT_MANAGER,
  TOGGLE_ADDING_MANAGER,
  ADD_MANAGER,
  TOGGLE_EDITING_MANAGER,
  EDIT_MANAGER,
  FETCH_SERVICES_REQUEST,
  ADD_SERVICE_REQUEST,
  DELETE_SERVICE_REQUEST,
  TOGGLE_ADD_SERVICE,
} from './constants';

export function changePageTitle (payload) {
  return {
    type: CHANGE_PAGE_TITLE,
    payload,
  };
}

export function fetchAccountManagers() {
  return {
    type: FETCH_ACCOUNT_MANAGERS
  };
}

export function selectManager(manager) {
  return {
    type: SELECT_MANAGER,
    payload: manager,
  };
}

export function toggleAddingManager(value) {
  return {
    type: TOGGLE_ADDING_MANAGER,
    payload: value,
  }
}

export function addManager(values) {
  return {
    type: ADD_MANAGER,
    payload: values,
  }
}

export function toggleEditingManager(manager) {
  return {
    type: TOGGLE_EDITING_MANAGER,
    payload: manager
  };
}

export function editManager(values) {
  return {
    type: EDIT_MANAGER,
    payload: values
  };
}

export function fetchServices() {
  return {
    type: FETCH_SERVICES_REQUEST,
  }
}

export function addService(service) {
  return {
    type: ADD_SERVICE_REQUEST,
    payload: service,
  };
}

export function deleteService(service) {
  return {
    type: DELETE_SERVICE_REQUEST,
    payload: service,
  };
}

export function toggleAddService(value) {
  return {
    type: TOGGLE_ADD_SERVICE,
    payload: value,
  }
}


