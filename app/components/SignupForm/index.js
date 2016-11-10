import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import renderDatePicker from 'components/DatePicker';
import { SEX_TYPES, US_STATES } from 'common/constants';
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
    dentistId: React.PropTypes.string,
  };

  render () {
    const { error, handleSubmit, submitting, dentistId } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

        {!dentistId ?
          <Alert bsStyle="danger">
            <h4>Sorry you need to be invited by a dentist.</h4>
          </Alert> : null}

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

        <FormGroup>
          <Col sm={12}>
            <ControlLabel>Address</ControlLabel>
          </Col>

          <Row>
            <Col md={12}>
              <Field
                name="address"
                type="text"
                component={Input}
                label="Street 1"
                width={6}
              />

              <Field
                name="address2"
                type="text"
                component={Input}
                label="Street 2"
                width={6}
              />

              <div className="col-sm-12" style={{ marginTop: 10 }} />
              <Field
                name="city"
                type="text"
                component={Input}
                label="City"
                width={6}
              />
              <Field
                name="state"
                type="select"
                component={Input}
                label="State"
                width={6}
              >
                <option value="">Select state</option>
                {states.map(item =>
                  <option
                    value={item[0]}
                    key={item[0]}
                  >
                    {item[1]}
                  </option>
                )}
              </Field>


            </Col>
          </Row>
        </FormGroup>


        <Row>
          <Field
            name="zipCode"
            type="text"
            component={LabeledInput}
            label="Zip code"
            width={6}
          />

          <Field
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Phone"
            width={6}
          />

          <Field
            name="birthDate"
            type="date"
            component={renderDatePicker}
            label="Birthdate"
            width={6}
          />
        </Row>

        <Row>
          <Field
            name="sex"
            type="select"
            label="Gender"
            component={LabeledInput}
            width={5}
          >
            <option value="">Select gender</option>
            {Object.keys(SEX_TYPES).map(key =>
              <option value={key} key={key}>
                {SEX_TYPES[key]}
              </option>
            )}
          </Field>
        </Row>

        <Field
          name="payingMember"
          component={Checkbox}
        >
          I'll also be joining the membership
        </Field>

        {/* <Field
          name="tos"
          component={Checkbox}
        >
          I have read and accept the{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>
        </Field> */}

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
