/*
Patient Signup Form Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  submit as submitForm,
} from 'redux-form';

// app
import {
  PREFERRED_CONTACT_METHODS,
  SEX_TYPES,
  US_STATES,
} from 'common/constants';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';
import SegmentedDatePicker from 'components/SegmentedDatePicker';

// local
import styles from './styles.css';
import signupFormValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    formValues: get(state.form, 'signupPatient.values', {}),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    submitSignupPatientForm: () => dispatch(submitForm('signupPatient')),
  };
}


/*
Signup Form
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'signupPatient',
  validate: signupFormValidator,
})
@CSSModules(styles)
class SignupForm extends React.Component {

  static propTypes = {
    // passed in
    autosubmit: React.PropTypes.bool,
    offices: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // state
    formValues: React.PropTypes.object.isRequired,

    // dispatch
    submitSignupPatientForm: React.PropTypes.func.isRequired,

    // redux form
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  componentWillMount () {
    const {
      // passed in
      offices,

      // redux form
      change,
    } = this.props;

    if (offices.length === 1) {
      change("officeId", offices[0].id);
    }
  }

  // NOTE: Auto-submit credit goes to some help from the internet.
  //       https://github.com/erikras/redux-form/issues/537
  componentWillReceiveProps (nextProps) {
    const {
      // passed in
      autosubmit,

      // dispatch
      submitSignupPatientForm,
    } = this.props;

    console.log("autosubmit: " + autosubmit)
    console.log("dirty: " + nextProps.dirty);
    console.log("valid: " + nextProps.valid);
    console.log("not equal values: " + (nextProps.formValues !== this.props.formValues));
    console.log(nextProps.formValues);
    console.log(this.props.formValues);
    console.log("");

    if ( autosubmit === true                            // autosubmit turned on
      && nextProps.dirty === true                       // the form has data
      && nextProps.valid === true                       // the form is valid
      && nextProps.formValues !== this.props.formValues // a change occurred
    ) {
      submitSignupPatientForm();
    }
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
    // passed in
      offices,

      // redux form
      error,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

        <FormGroup>
          <div className="col-sm-12">
            <ControlLabel>Your Name:</ControlLabel>
          </div>

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
            className="col-sm-offset-2 col-sm-4"
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
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Phone"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="contactMethod"
            type="select"
            label="Preferred Contact Method"
            component={LabeledInput}
            className="col-sm-6"
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
              *Password must be at least 8 characters and include one (1) special character and one (1) capital letter.
            </h5>
          </div>
        </Row>

        <hr styleName="spacer" />

        <Row>
          {/* NOTE: If there is only 1 office it is automatically chosen, so there
              is no need to show the office selector.
          */}
          {offices.length > 1
            ? ( <Field
                  name="officeId"
                  type="select"
                  label="Dental Office"
                  component={LabeledInput}
                  className="col-sm-4"
                >
                  <option value="">Select dental office</option>
                  {offices.map((office) => {
                    return (
                      <option value={office.id} key={office.id}>
                        {office.officeName}
                      </option>
                    );
                  })}
                </Field>
              )
            : ( <div styleName="hidden-field">
                  <Field
                    name="officeId"
                    type="hidden"
                    component={Input}
                  />
                </div>
              )
          }

          {/* TODO: select membership type here */}

          <div className="col-sm-4" styleName="align-with-input">
            <Field
              name="userIsMember"
              component={Checkbox}
            >
              <strong>I Will Also Be A Member</strong>
            </Field>
          </div>
        </Row>

        <FormGroup className="has-error">
          <div className="col-sm-12">
            {error && <HelpBlock>{error}</HelpBlock>}
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default SignupForm;
