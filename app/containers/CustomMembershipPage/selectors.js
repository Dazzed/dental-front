import seedPlansData from './seedPlans';

// Converts given string to lower case and trims it.
function lcTrim (string) {
  return string.toLowerCase().trim();
}

export function selectActivePlans (dentistInfo) {
  if (dentistInfo.custom_memberships) {
    if (dentistInfo.custom_memberships.length) {
      dentistInfo.custom_memberships = dentistInfo.custom_memberships
        .filter(m => m.active);
    }
  }
  return dentistInfo;
}

export function selectSeedPlans (state) {
  try {
    const {
      dentistCustomMembershipPage: {
        dentistInfo: {
          custom_memberships
        }
      }
    } = state;
    console.log('27',custom_memberships);
    return seedPlansData
      .filter(
        sp => !custom_memberships.some(cm => lcTrim(cm.name) === lcTrim(sp.name))
      );
  } catch (e) {
    return [];
  }
}
