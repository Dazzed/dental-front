import { createValidator, email, required } from 'utils/reduxForm';

const  loginFormValidator = createValidator({
  email: [ email, required ],
  password: [ required ],
});

export default loginFormValidator;
