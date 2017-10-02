// As the user enters the price for each Price codes, We sum the prices to populate the total field.
export function selectTotal (state) {
  if (state.form) {
    if (state.form.createPlan) {
      const form = state.form.createPlan;
      if (Object.keys(form).length) {
        if (form.values) {
          const { codes } = form.values;
          if (codes && codes.length) {
            return codes.reduce((acc, c) => {
              if (c.price) {
                acc += c.frequency ? Number(c.frequency) * Number(c.price) : Number(c.price);
              }
              return Math.abs(acc);
            }, 0);
          }
        }
      }
    }
  }
  return '0';
}

// Get the form values of the selected price codes
export function selectPriceCodes (state) {
  if (state.form) {
    if (state.form.createPlan) {
      const form = state.form.createPlan;
      if (Object.keys(form).length) {
        if (form.values) {
          const { codes } = form.values;
          if (codes && codes.length) {
            return codes;
          }
        }
      }
    }
  }
  return [];
}

export function selectRecommendedFee (state) {
  try {
    const { codes } = state.form.createPlan.values;
    const { dentistInfo } = state.dentistCustomMembershipPage;
    let discount = 0;
    if (dentistInfo.custom_memberships.length) {
      discount = dentistInfo.custom_memberships[0].discount;
    }
    return codes.reduce((acc, c) => {
      if (!c.price) {
        acc += 0;
        return acc;
      }
      const freq = c.frequency || 1;
      const discountedPrice = (c.price * freq) - ((c.price * freq) * (discount / 100));
      acc += discountedPrice / 12;
      return Math.floor(acc);
    }, 0);
  } catch (e) {
    return '';
  }
}
