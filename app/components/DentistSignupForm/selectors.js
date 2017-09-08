import { createSelector } from 'reselect';
const domainSelector = state => state.form['dentist-signup'];

const logoSelector = createSelector(
  domainSelector,
  subState => {
    if (subState.values.officeInfo) {
      if (subState.values.officeInfo.logo) {
        return subState.values.officeInfo.logo;
      }
      return null;
    }
    return null;
  }
);

const avatarSelector = createSelector(
  domainSelector,
  subState => {
    if (subState.values.user) {
      if (subState.values.user.avatar) {
        return subState.values.user.avatar;
      }
      return null;
    }
    return null;
  }
);

const officeImage0Selector = createSelector(
  domainSelector,
  subState => {
    if (subState.values.officeInfo) {
      if (subState.values.officeInfo.officeImages0) {
        return subState.values.officeInfo.officeImages0;
      }
      return null;
    }
    return null;
  }
);

const officeImage1Selector = createSelector(
  domainSelector,
  subState => {
    if (subState.values.officeInfo) {
      if (subState.values.officeInfo.officeImages1) {
        return subState.values.officeInfo.officeImages1;
      }
      return null;
    }
    return null;
  }
);

const officeImage2Selector = createSelector(
  domainSelector,
  subState => {
    if (subState.values.officeInfo) {
      if (subState.values.officeInfo.officeImages2) {
        return subState.values.officeInfo.officeImages2;
      }
      return null;
    }
    return null;
  }
);

export {
  logoSelector,
  avatarSelector,
  officeImage0Selector,
  officeImage1Selector,
  officeImage2Selector
};
