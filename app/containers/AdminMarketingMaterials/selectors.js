import get from 'lodash/get';
import { createSelector } from 'reselect';

const domainSelector = state => state.AdminMarketingMaterialsPage;

const marketingMaterialsSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'marketingMaterials')
);

const booleanFlagSelector = createSelector(
  domainSelector,
  (substate) => booleanName => get(substate, booleanName)
);

const deletingMaterialSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'deletingMaterial')
);

const deletingCategorySelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'deletingCategory')
);

export default domainSelector;

export {
  marketingMaterialsSelector,
  booleanFlagSelector,
  deletingMaterialSelector,
  deletingCategorySelector
};
