import { createReducer } from 'redux-act';

import {
  fetchMaterialsSuccess,
  toggleAddCategoryModal,
  addCategory,
  addCategorySuccess,
  addCategoryError,
  toggleAddMaterialModal,
  addMaterial,
  addMaterialSuccess,
  addMaterialError,
  setDeletingMaterial,
  deleteMaterial,
  deleteMaterialSuccess,
  deleteMaterialError,
  setDeletingCategory,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryError,
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
  addMaterialOpen: false,

  editingCategoryId: null,
  deletingMaterial: { id: null, name: null },
  deletingCategory: { id: null, name: null }
};

const reducer = {
  [fetchMaterialsSuccess]: (state, marketingMaterials) => ({
    ...state,
    isFetchingData: false,
    marketingMaterials
  }),
  [toggleAddCategoryModal]: (state, flag) => ({
    ...state,
    addCategoryOpen: flag
  }),
  [addCategory]: state => ({
    ...state,
    isAddingCategory: true,
  }),
  [addCategorySuccess]: (state, addedCategory) => ({
    ...state,
    isAddingCategory: false,
    addCategoryOpen: false,
    marketingMaterials: state.marketingMaterials.concat(addedCategory)
  }),
  [addCategoryError]: state => ({
    ...state,
    isAddingCategory: false
  }),
  [toggleAddMaterialModal]: (state, { flag, categoryId }) => ({
    ...state,
    addMaterialOpen: flag,
    editingCategoryId: categoryId
  }),
  [addMaterial]: state => ({
    ...state,
    isAddingMaterial: true,
  }),
  [addMaterialSuccess]: (state, editedCategory) => {
    const { marketingMaterials } = state;
    const editedCategoryIndex = marketingMaterials.findIndex(m => m.id === editedCategory.id);
    return {
      ...state,
      isAddingMaterial: false,
      addMaterialOpen: false,
      marketingMaterials: [
        ...marketingMaterials.slice(0, editedCategoryIndex),
        editedCategory,
        ...marketingMaterials.slice(editedCategoryIndex + 1)
      ]
    };
  },
  [addMaterialError]: state => ({
    ...state,
    isAddingMaterial: false
  }),
  [setDeletingMaterial]: (state, { id, name }) => ({
    ...state,
    deletingMaterial: { id, name }
  }),
  [deleteMaterial]: state => ({
    ...state,
    isDeletingMaterial: true
  }),
  [deleteMaterialSuccess]: (state, editedCategory) => {
    const { marketingMaterials } = state;
    const editedCategoryIndex = marketingMaterials.findIndex(m => m.id === editedCategory.id);
    return {
      ...state,
      isDeletingMaterial: false,
      deletingMaterial: { id: null, name: null },
      marketingMaterials: [
        ...marketingMaterials.slice(0, editedCategoryIndex),
        editedCategory,
        ...marketingMaterials.slice(editedCategoryIndex + 1)
      ]
    };
  },
  [deleteMaterialError]: state => ({
    ...state,
    isDeletingMaterial: false
  }),
  [setDeletingCategory]: (state, { id, name }) => ({
    ...state,
    deletingCategory: { id, name }
  }),
  [deleteCategory]: state => ({
    ...state,
    isDeletingCategory: true
  }),
  [deleteCategorySuccess]: (state, deletedCategoryId) => ({
    ...state,
    marketingMaterials: state.marketingMaterials.filter(m => m.id !== deletedCategoryId),
    isDeletingCategory: false,
    deletingCategory: { id: null, name: null },
  }),
  [deleteCategoryError]: state => ({
    ...state,
    isDeletingCategory: false
  })
};

export default createReducer(reducer, initialState);
