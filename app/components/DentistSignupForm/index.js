import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import CSSModules from 'react-css-modules';

import signupFormValidator from './validator';
import styles from './styles.css';

const renderField = ({ input, label, type, meta: { touched, error }, width }) => ( // eslint-disable-line react/prop-types
  <FormGroup className={touched && error ? 'has-error': ''}>
    <Col sm={12}>
      <ControlLabel>{label}</ControlLabel>
    </Col>
    <Col sm={width || 12}>
      <FormControl {...input} placeholder={label} type={type} />
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </Col>
  </FormGroup>
);

const renderName = ({ input, label, type, meta: { touched, error } }) => ( // eslint-disable-line react/prop-types
  <Col sm={5}>
    <FormControl {...input} placeholder={label} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </Col>
);

const renderCheckBox = ({ input, label, type, meta: { touched, error } }) => ( // eslint-disable-line react/prop-types
  <Col sm={5}>
    <FormControl {...input} placeholder={label} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </Col>
);

@reduxForm({
  form: 'dentist-signup',
  validate: signupFormValidator,
})
@CSSModules(styles)
class DentistSignupForm extends React.Component {
  render () {
    const { error, handleSubmit, pristine, reset, submitting } = this.props; // eslint-disable-line react/prop-types
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Field name="email" type="text" component={renderField} label="Email Address" width={12} />
        <Field name="confirmEmail" type="text" component={renderField} label="Confirm Email Address" width={12} />
        <Field name="password" type="password" component={renderField} label="Password" width={6} />
        <Field name="confirmPassword" type="password" component={renderField} label="Confirm Password" width={6} />
        <FormGroup>
          <Col sm={12}>
            <ControlLabel>Name</ControlLabel>
          </Col>
          <Field name="firstName" type="text" component={renderName} label="First Name" />
          <Field name="lastName" type="text" component={renderName} label="Last Name" />
        </FormGroup>
        <Field name="phone" type="text" component={renderField} label="Phone Number" width={5} />
        <Field name="zipCode" type="text" component={renderField} label="Zip Code" width={3} />
        <FormGroup>
          <Col sm={12}>
            <Field name="tos" type="checkbox" component="input" styleName="checkbox" />
            <span styleName="checkbox-label">I have read and accept the <a href="">Terms of Conditions</a></span>
          </Col>
        </FormGroup>

        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <button type="submit" disabled={submitting} className="btn-bg btn-green btn-round btn-outline">Continue</button>
          </Col>
        </FormGroup>
      </form>
    );
  };
}

export default DentistSignupForm;
