import { createSelector } from 'reselect';

const selectProfilePageDomain = state =>
  state.profilePage;

const selectProfileData = createSelector(
  selectProfilePageDomain,
  (substate) => substate.profileData
);

const selectSubmitting = createSelector(
  selectProfilePageDomain,
  (substate) => substate.submitting
);

export default selectProfilePageDomain;

export {
  selectProfileData,
  selectSubmitting,
};
