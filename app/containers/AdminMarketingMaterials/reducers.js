import { createReducer } from 'redux-act';

import {
  fetchMaterialsSuccess
} from './actions';

const initialState = {
  marketingMaterials: [],

  // ajax bools
  isFetchingData: true,
  isAddingCategory: false,
  isAddingMaterial: false,
  isDeletingCategory: false,
  isDeletingMaterial: false,

  // modal bools
  addCategoryOpen: false,
  addMaterialOpen: false
};

const reducer = {
  [fetchMaterialsSuccess]: (state, marketingMaterials) => ({
    ...state,
    isFetchingData: false,
    marketingMaterials
  })
};

export default createReducer(reducer, initialState);
