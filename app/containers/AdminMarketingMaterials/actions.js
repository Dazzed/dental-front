import { createAction } from 'redux-act';

const PREFIX = 'ADMIN_MARKETING_MATERIALS';

const fetchMaterials = createAction(`${PREFIX}_FETCH`);

const fetchMaterialsSuccess = createAction(
  `${PREFIX}_FETCH_SUCCESS`,
  marketingMaterials => marketingMaterials
);

const toggleAddCategoryModal = createAction(
  `${PREFIX}_TOGGLE_ADD_CATEGORY_MODAL`,
);

const addCategory = createAction(
  `${PREFIX}_ADD_CATEGORY`,
  categoryName => categoryName
);

const addCategorySuccess = createAction(
  `${PREFIX}_ADD_CATEGORY_SUCCESS`,
  addedCategory => addedCategory
);

const addCategoryError = createAction(
  `${PREFIX}_ADD_CATEGORY_ERROR`,
);

const setDeletingCategory = createAction(
  `${PREFIX}_SET_DELETING_CATEGORY`,
  ({ id, name }) => ({ id, name })
);

const deleteCategory = createAction(
  `${PREFIX}_DELETE_CATEGORY`,
  categoryId => categoryId
);

const deleteCategorySuccess = createAction(
  `${PREFIX}_DELETE_CATEGORY_SUCCESS`,
  deletedCategoryId => deletedCategoryId
);

const deleteCategoryError = createAction(
  `${PREFIX}_DELETE_CATEGORY_ERROR`,
);

const toggleAddMaterialModal = createAction(
  `${PREFIX}_TOGGLE_ADD_FILE_MODAL`,
  ({ flag, categoryId }) => ({ flag, categoryId })
);

const addMaterial = createAction(
  `${PREFIX}_ADD_MATERIAL`,
  ({ fileKey, categoryId }) => ({ fileKey, categoryId })
);

const addMaterialSuccess = createAction(
  `${PREFIX}_ADD_MATERIAL_SUCCESS`,
  editedCategory => editedCategory
);

const addMaterialError = createAction(
  `${PREFIX}_ADD_MATERIAL_ERROR`,
);

const setDeletingMaterial = createAction(
  `${PREFIX}_SET_DELETING_MATERIAL`,
  ({ id, name }) => ({ id, name })
);

const deleteMaterial = createAction(
  `${PREFIX}_DELETE_MATERIAL`,
  materialId => materialId
);

const deleteMaterialSuccess = createAction(
  `${PREFIX}_DELETE_MATERIAL_SUCCESS`,
  editedCategory => editedCategory
);

const deleteMaterialError = createAction(
  `${PREFIX}_DELETE_MATERIAL_ERROR`,
);

export {
  PREFIX,
  fetchMaterials,
  fetchMaterialsSuccess,
  toggleAddCategoryModal,
  addCategory,
  addCategorySuccess,
  addCategoryError,
  setDeletingCategory,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryError,
  toggleAddMaterialModal,
  addMaterial,
  addMaterialSuccess,
  addMaterialError,
  setDeletingMaterial,
  deleteMaterial,
  deleteMaterialSuccess,
  deleteMaterialError
};
