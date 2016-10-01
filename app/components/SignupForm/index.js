import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';

import signupFormValidator from './validator';
import styles from './styles.css';


@reduxForm({
  form: 'signup',
  validate: signupFormValidator,
})
class SignupForm extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Row>
          <Field
            name="email"
            type="text"
            component={LabeledInput}
            label="Email Address"
            width={12}
          />

          <Field
            name="confirmEmail"
            type="text"
            component={LabeledInput}
            label="Confirm Email Address"
            width={12}
          />

          <Field
            name="password"
            type="password"
            component={LabeledInput}
            label="Password"
            width={6}
          />

          <Field
            name="confirmPassword"
            type="password"
            component={LabeledInput}
            label="Confirm Password"
            width={6}
          />
        </Row>

        <FormGroup>
          <Col sm={12}>
            <ControlLabel>Name</ControlLabel>
          </Col>

          <Row>
            <Col md={12}>
              <Field
                name="firstName"
                type="text"
                component={Input}
                label="First Name"
                width={5}
              />

              <Field
                name="lastName"
                type="text"
                component={Input}
                label="Last Name"
                width={5}
              />
            </Col>
          </Row>
        </FormGroup>

        <Row>
          <Field
            name="sex"
            type="select"
            label="Gender"
            component={LabeledInput}
            width={5}
          >
            <option value="">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Field>
        </Row>

        <FormGroup>
          <Col sm={12}>
            <Field
              name="accountHolder"
              type="checkbox"
              component="input"
              className={styles.checkbox}
            />

            <span className={styles['checkbox-label']}>
              Will their primary account holder be joining the membership
            </span>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <Field
              name="tos"
              type="checkbox"
              component="input"
              className={styles.checkbox}
            />

            <span className={styles['checkbox-label']}>
              I have read and accept the <a href="">Terms of Conditions</a>
            </span>
          </Col>
        </FormGroup>

        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <button
              type="submit"
              disabled={submitting}
              className="btn-bg btn-cyan btn-round btn-outline"
            >
              Continue
            </button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

export default SignupForm;
