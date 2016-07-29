import validator from 'validate.js';
import lodash from 'lodash';


const schema = {
  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  birthDate: {
    presence: {
      message: 'is not a valid date',
    },
    datetime: {
      dateOnly: true,
    }
  },
  phone: {
    presence: true,
  },
  relationship: {
    presence: true,
  },
  email: {
    presence: true,
    email: true,
  },
  accountType: {
    presence: true,
  },
};


export default values => {
  const errorList = {};
  errorList.familyMembers = lodash.map(values.familyMembers, (member) => {
    const errors = validator(member, schema);
    lodash.forEach(errors, (item, key) =>
      errors[key] = item[0]
    );
    return errors;
  });

  return errorList;
};
