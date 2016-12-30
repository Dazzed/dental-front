import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import { US_STATES } from 'common/constants';
import forOwn from 'lodash/forOwn';

import signupFormValidator from './validator';


const states = [];

forOwn(US_STATES, (value, key) => {
  states.push([ key, value ]);
});


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
        </Row>
        <h5>
          Password should have at least 6 characters, upper case,{' '}
          lower case and numbers.
        </h5>

        <Row>
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
                width={4}
              />

              <Field
                name="middleName"
                type="text"
                component={Input}
                label="Middle Name"
                width={4}
              />

              <Field
                name="lastName"
                type="text"
                component={Input}
                label="Last Name"
                width={4}
              />
            </Col>
          </Row>
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
              className="btn btn-block btn-cyan btn-round btn-outline"
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
