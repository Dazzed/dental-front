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
          custom_memberships,
          priceCodes
        }
      }
    } = state;

    // Filter the plans which dentist hasn't activated.
    // Map the plans to prefill the prices based on the value dentist has entered in the register form.
    const seedPlans = seedPlansData
      .filter(sp => !custom_memberships.some(cm => lcTrim(cm.name) === lcTrim(sp.name)))
      .map(sp => {
        const codes = sp.codes.map(code => {
          const price = priceCodes.find(pc => pc.code === code.priceCodeName.replace('D', '')).price;
          return {
            ...code,
            price: parseFloat(price)
          };
        });
        return {
          ...sp,
          codes
        };
      });
    return seedPlans;
  } catch (e) {
    return [];
  }
}
