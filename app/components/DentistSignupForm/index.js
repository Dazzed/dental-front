/*
Dentist Signup Form Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// app
import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';
import { isInvalidNameSelector } from 'containers/DentistSignupPage/selectors';

// local
import styles from './styles.css';
import dentistSignupFormValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    isInvalidName: isInvalidNameSelector(state),
  };
}


/*
Signup Form
================================================================================
*/
@reduxForm({
  form: 'dentist-signup',
  validate: dentistSignupFormValidator,
})
@connect(mapStateToProps, null)
@CSSModules(styles)
class DentistSignupForm extends React.Component {

  static propTypes = {
    // passed from parent
    dentistSpecialties: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.date,
      updatedAt: React.PropTypes.date,
    })),

    // mapped from props
    isInvalidName: React.PropTypes.bool,

    // redux form
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const {
      // state
      dentistSpecialties,
      isInvalidName,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <FormGroup className={isInvalidName ? 'has-error' : ''}>
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
            name="specialtyId"
            type="select"
            label="Specialty"
            component={LabeledInput}
            className="col-sm-4"
          >
            <option value="">Select an Specialty</option>
            {dentistSpecialties.map((specialty, index) => (
              <option value={specialty.id} key={index}>
                {specialty.name}
              </option>
            ))}
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
              value="CREATE MY ACCOUNT &gt;"
              styleName="large-button--secondary"
            />
          </Col>
        </FormGroup>
      </form>
    );
  }
}

export default DentistSignupForm;
