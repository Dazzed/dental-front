/*
Patient Signup Form Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import forOwn from 'lodash/forOwn';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// app
import {
  PREFERRED_CONTACT_METHODS, SEX_TYPES, US_STATES
} from 'common/constants';
import SegmentedDatePicker from 'components/SegmentedDatePicker';
import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import signupFormValidator from './validator';


/*
Signup Form
================================================================================
*/
@reduxForm({
  form: 'signup',
  validate: signupFormValidator,
})
@CSSModules(styles)
class SignupForm extends React.Component {

  static propTypes = {
    // passed from parent
    offices: React.PropTypes.array,

    // redux form
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const {
      // passed from parent
      offices,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

        <FormGroup>
          <Col sm={12}>
            <ControlLabel>Your Name:</ControlLabel>
          </Col>

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
            label="Middle Name (optional)"
            width={4}
          />

          <Field
            name="lastName"
            type="text"
            component={Input}
            label="Last Name"
            width={4}
          />
        </FormGroup>

        <Row>
          <Field
            name="birthDate"
            type="date"
            component={SegmentedDatePicker}
            label="Date of Birth"
            className="col-sm-6"
          />

          <Field
            name="sex"
            type="select"
            label="Sex"
            component={LabeledInput}
            className="col-sm-2 col-sm-offset-2"
          >
            <option value=""></option>
            {Object.keys(SEX_TYPES).map(key =>
              <option value={key} key={key}>
                {SEX_TYPES[key]}
              </option>
            )}
          </Field>
        </Row>

        <hr styleName="spacer" />

        <Row>
          <Field
            name="address"
            type="text"
            component={LabeledInput}
            label="Address"
            placeholder=""
            className="col-sm-12"
          />

          <Field
            name="city"
            type="text"
            component={LabeledInput}
            label="City"
            placeholder=""
            className="col-sm-4"
          />

          <Field
            name="state"
            type="select"
            component={LabeledInput}
            label="State"
            placeholder=""
            className="col-sm-4"
          >
            <option value=""></option>
            {Object.keys(US_STATES).map(key =>
              <option value={key} key={key}>
                {US_STATES[key]}
              </option>
            )}
          </Field>

          <Field
            name="zipCode"
            type="text"
            mask="99999"
            maskChar=" "
            component={LabeledInput}
            label="Zip Code"
            placeholder=""
            className="col-sm-4"
          />
        </Row>

        <hr styleName="spacer" />

        <Row>
          <Field
            name="officeId"
            type="select"
            label="Dental Office"
            component={LabeledInput}
            className="col-sm-4"
          >
            <option value="">Select dental office</option>
            {offices.map(e =>
              <option value={e.id} key={e.id}>
                {e.officeName}
              </option>
            )}
          </Field>

          <Field
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Phone"
            placeholder=""
            className="col-sm-4"
          />

          <Field
            name="contactMethod"
            type="select"
            label="Preferred Contact Method"
            component={LabeledInput}
            className="col-sm-4"
          >
            <option value=""></option>
            {Object.keys(PREFERRED_CONTACT_METHODS).map(key =>
              <option
                value={key}
                key={key}
              >
                {PREFERRED_CONTACT_METHODS[key]}
              </option>
            )}
          </Field>
        </Row>

        <hr styleName="spacer" />

        <Row>
          <Field
            name="email"
            type="text"
            component={LabeledInput}
            label="Email Address"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="confirmEmail"
            type="text"
            component={LabeledInput}
            label="Confirm Email Address"
            placeholder=""
            className="col-sm-6"
          />
        </Row>

        <Row>
          <Field
            name="password"
            type="password"
            component={LabeledInput}
            label="Password"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="confirmPassword"
            type="password"
            component={LabeledInput}
            label="Confirm Password"
            placeholder=""
            className="col-sm-6"
          />

          <div className="col-sm-12">
            <h5 styleName="field-instructions">
              Password should have at least 6 characters, upper case, lower case and numbers.
            </h5>
          </div>
        </Row>

        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>

        <FormGroup className="text-center">
          <Col sm={12}>
            <input
              type="submit"
              disabled={submitting}
              value="NEXT &gt;"
              styleName="large-button--secondary"
            />
          </Col>
        </FormGroup>
      </form>
    );
  }
}

export default SignupForm;
