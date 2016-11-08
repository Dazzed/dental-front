import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
// import Checkbox from 'components/Checkbox';
import { selectDentistSpecialties } from 'containers/App/selectors';
import { isInvalidNameSelector } from 'containers/DentistSignupPage/selectors';
import signupFormValidator from './validator';


@reduxForm({ form: 'dentist-signup', validate: signupFormValidator })
@connect(state => ({
  isInvalidName: isInvalidNameSelector(state),
  dentistSpecialties: selectDentistSpecialties(state),
}))
class DentistSignupForm extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    isInvalidName: React.PropTypes.bool,
    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })),
  };

  render () {
    const { error, handleSubmit, submitting } = this.props;
    const { isInvalidName, dentistSpecialties } = this.props;

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

        <FormGroup className={isInvalidName ? 'has-error' : ''}>
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

        <Row>
          <Field
            name="specialtyId"
            type="select"
            label="Specialty"
            component={LabeledInput}
            width={5}
          >
            <option value="">Select an Specialty</option>
            {dentistSpecialties.map((specialty, index) =>
              (<option value={specialty.id} key={index}>
                {specialty.name}
              </option>)
            )}
          </Field>

          <Field
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Phone Number"
            width={5}
          />

          <Field
            name="zipCode"
            type="text"
            component={LabeledInput}
            label="Zip Code"
            width={3}
          />

        </Row>

        {/* <Field
          name="tos"
          component={Checkbox}
        >
          I have read and accept the <a href="">Terms of Conditions</a>
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
              className="btn btn-block btn-green btn-round btn-outline"
            >
              Continue
            </button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

export default DentistSignupForm;
