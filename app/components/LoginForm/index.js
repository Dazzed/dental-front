import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import CSSModules from 'react-css-modules';

import loginFormValidator from './validator';
import styles from './styles.css';

const renderField = ({ input, label, type, meta: { touched, error } }) => ( // eslint-disable-line react/prop-types
  <FormGroup className={touched && error ? 'has-error': ''}>
    <Col sm={12}>
      <ControlLabel>{label}</ControlLabel>
    </Col>
    <Col sm={12}>
      <FormControl {...input} placeholder={label} type={type} />
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </Col>
  </FormGroup>
);

@reduxForm({
  form: 'login',
  validate: loginFormValidator,
})
@CSSModules(styles)
class LoginForm extends React.Component {
  render () {
    const { error, handleSubmit, reset, submitting } = this.props; // eslint-disable-line react/prop-types
    return (
      <form onSubmit={handleSubmit} styleName="wrapper" className="form-horizontal">
        <Field name="email" type="text" component={renderField} label="User Name" />
        <Field name="password" type="password" component={renderField} label="Password" />
        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={6} smPush={6}>
            <button type="submit" disabled={submitting} className="btn-bg btn-cyan btn-round">Log In</button>
          </Col>
        </FormGroup>
      </form>
    );
  };
}

export default LoginForm;
