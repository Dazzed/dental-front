/*
Account Security Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  newEmail: { email: true },
  confirmNewEmail: { email: true, equality: 'newEmail' },

  newPassword: {
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) capital letter, one (1) number.`,
    },
    equality: {
      attribute: "oldPassword",
      message: '^Your new password cannot be the same as your old password.',
      comparator: function(pass1, pass2) {
        return pass1 !== pass2;
      }
    },
  },
  confirmNewPassword: { equality: 'newPassword' },

  oldPassword: {
    presence: true,
  }
};

const fieldValidators = validatorFactory(schema);

const formValidator = (values) => {
  let errors = fieldValidators(values);

  if ( values.newEmail === undefined
    && values.confirmNewEmail === undefined
    && values.newPassword === undefined
    && values.confirmNewPassword === undefined
    || (values.changeEmail === false && values.changePassword === false)
  ) {
    errors.changeEmail = 'You must update your email, password, or both.';
    errors.changePassword = 'You must update your email, password, or both.';
  }

  return errors;
};

export default formValidator;
