export function removeDuplicates(array, key) {
  let obj = {};
  let filteredArray = [];
  for (let i = 0, len = array.length; i < len; i++) {
    obj[array[i][key].toString()] = array[i];
  }

  for (let j in obj) {
    if (obj.hasOwnProperty(j)) {
      filteredArray.push(obj[j]);
    }
  }

  return filteredArray;
}

/*
  name: pluckMembershipfee,
  desc: computes and returns the membership fee amount of the membership the user has selected.
  arguments: user <Object>, dentistMemberships Array<Object>
  returns: amount <String>
*/
export function pluckMembershipfee (user, dentistMemberships) {
  let { membershipId } = user;
  if (!membershipId) {
    if (user.subscription)
      membershipId = user.subscription.membershipId;
  }
  const membership = dentistMemberships.find(m => String(m.id) === String(membershipId));
  if (membership) {
    return membership.price;
  }
  return '0';
}

export function calculateSubtotal (users, dentistMemberships) {
  const normalizedDentistMemberships = dentistMemberships.reduce((acc, m) => {
    return {
      ...acc,
      [m.id]: m,
    };
  }, {});
  try {
    const subTotal = users.reduce((acc, u) => {
      if (normalizedDentistMemberships[u.membershipId]) {
        return acc += Number(normalizedDentistMemberships[u.membershipId].price);
      } else {
        return acc;
      }
    }, 0);
    return String(subTotal);
  } catch (e) {
    return '0';
  }
}
