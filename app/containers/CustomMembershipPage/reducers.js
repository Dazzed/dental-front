import { createReducer } from 'redux-act';

import {
  fetchDentistInfoSuccess,
  createMembership,
  createMembershipSuccess,
  createMembershipError,
  editMembership,
  editMembershipSuccess,
  editMembershipError,
  setEditingMembershipId
} from './actions';

const defaultState = {
  dentistInfo: false,
  loading: {
    creatingMembership: false,
    editingMembership: false
  },
  editingMembershipId: null
};

const reducer = {
  [fetchDentistInfoSuccess]: (state, dentistInfo) => ({
    ...state,
    dentistInfo
  }),
  [createMembership]: state => {
    const { loading } = state;
    return {
      ...state,
      loading: {
        ...loading,
        creatingMembership: true
      }
    };
  },
  [createMembershipSuccess]: (state, membership) => {
    const { dentistInfo, loading } = state;
    return {
      ...state,
      dentistInfo: {
        ...dentistInfo,
        custom_memberships: dentistInfo.custom_memberships.concat(membership)
      },
      loading: {
        ...loading,
        creatingMembership: false
      }
    };
  },
  [createMembershipError]: state => {
    const { loading } = state;
    return {
      ...state,
      loading: {
        ...loading,
        creatingMembership: false
      }
    };
  },
  [editMembership]: state => {
    const { loading } = state;
    return {
      ...state,
      loading: {
        ...loading,
        editingMembership: true
      }
    };
  },
  [editMembershipSuccess]: (state, custom_memberships) => {
    const { dentistInfo, loading } = state;
    return {
      ...state,
      dentistInfo: {
        ...dentistInfo,
        custom_memberships
      },
      loading: {
        ...loading,
        editingMembership: false
      },
      editingMembershipId: null
    };
  },
  [editMembershipError]: state => {
    const { loading } = state;
    return {
      ...state,
      loading: {
        ...loading,
        editingMembership: false
      }
    };
  },
  [setEditingMembershipId]: (state, editingMembershipId) => {
    return {
      ...state,
      editingMembershipId
    };
  }
};

export default createReducer(reducer, defaultState);
