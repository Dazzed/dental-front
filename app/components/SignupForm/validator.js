import {
  createValidator,
  email,
  password,
  required,
  match,
} from 'utils/reduxForm';

const tosValidator = (value) => {
  if (value !== true) {
    return 'Please accept the terms of conditions.';
  }

  return '';
};


const signupFormValidator = createValidator({
  email: [ required, email ],
  confirmEmail: [ required, match('email') ],
  password: [ required, password ],
  confirmPassword: [ required, match('password') ],
  tos: [ required, tosValidator ],
});

export default signupFormValidator;
