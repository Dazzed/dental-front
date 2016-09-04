import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import { selectDentistSpecialties } from 'containers/App/selectors';
import { isInvalidNameSelector } from 'containers/DentistSignupPage/selectors';
import signupFormValidator from './validator';
import styles from './styles.css';


let TOSCheckbox = ({ input, meta: { touched, error } }) => (
  <Col sm={12}>
    <FormGroup className={touched && error ? 'has-error': ''}>
      <label styleName="checkbox-label">
        <FormControl {...input} type="checkbox" styleName="checkbox" />
        I have read and accept the <a href="">Terms of Conditions</a>
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </label>
    </FormGroup>
  </Col>
);


TOSCheckbox.propTypes = {
  input: React.PropTypes.object.isRequired,
  meta: React.PropTypes.object.isRequired,
};

TOSCheckbox = CSSModules(styles)(TOSCheckbox);


@reduxForm({ form: 'dentist-signup', validate: signupFormValidator })
@connect(state => ({
  isInvalidName: isInvalidNameSelector(state),
  dentistSpecialties: selectDentistSpecialties(state),
}))
@CSSModules(styles)
class DentistSignupForm extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
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
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    const { isInvalidName, dentistSpecialties } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
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

        <FormGroup className={isInvalidName ? 'has-error': ''}>
          <Col sm={12}>
            <ControlLabel>Name</ControlLabel>
          </Col>

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
        </FormGroup>

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

        <Field
          name="tos"
          component={TOSCheckbox}
        />

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
              className="btn-bg btn-green btn-round btn-outline"
            >
              Continue
            </button>
          </Col>
        </FormGroup>
      </form>
    );
  };
}

export default DentistSignupForm;
