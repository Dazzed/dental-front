import { createReducer } from 'redux-act';

import {
  fetchDentistInfoSuccess,
  createMembership,
  createMembershipSuccess,
  createMembershipError,
  editMembership,
  editMembershipSuccess,
  editMembershipError,
  setEditingMembershipId,
  deleteMembership,
  deleteMembershipSuccess,
  deleteMembershipError,
  setDeletingMembershipId
} from './actions';

const defaultState = {
  dentistInfo: false,
  loading: {
    creatingMembership: false,
    editingMembership: false,
    deletingMembership: false,
  },
  editingMembershipId: null,
  deletingMembershipId: null
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
  },
  [deleteMembership]: state => {
    const { loading } = state;
    return {
      ...state,
      loading: {
        ...loading,
        deletingMembership: true
      }
    };
  },
  [deleteMembershipSuccess]: (state, custom_memberships) => {
    const { dentistInfo, loading } = state;
    return {
      ...state,
      dentistInfo: {
        ...dentistInfo,
        custom_memberships
      },
      loading: {
        ...loading,
        deletingMembership: false
      },
      deletingMembershipId: null
    };
  },
  [deleteMembershipError]: state => {
    const { loading } = state;
    return {
      ...state,
      loading: {
        ...loading,
        deletingMembership: false
      },
      deletingMembershipId: null
    };
  },
  [setDeletingMembershipId]: (state, deletingMembershipId) => {
    return {
      ...state,
      deletingMembershipId
    };
  },
};

export default createReducer(reducer, defaultState);
