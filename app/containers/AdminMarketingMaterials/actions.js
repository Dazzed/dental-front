import { createAction } from 'redux-act';

const fetchMaterials = createAction('ADMIN_MARKETING_MATERIALS_FETCH');

const fetchMaterialsSuccess = createAction(
  'ADMIN_MARKETING_MATERIALS_FETCH_SUCCESS',
  marketingMaterials => marketingMaterials
);

export {
  fetchMaterials,
  fetchMaterialsSuccess
};
