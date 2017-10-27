import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  newPassword: {
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) capital letter, one (1) number.`,
    },
    equality: {
      attribute: 'password',
      message: '^Your new password cannot be the same as your old password.',
      comparator: (pass1, pass2) => {
        return pass1 !== pass2;
      }
    },
  },
  confirmNewPassword: { equality: 'newPassword' },

  password: {
    presence: true,
  }
};

export default validatorFactory(schema);
