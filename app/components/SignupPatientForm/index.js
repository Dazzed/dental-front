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
  getFormValues,
  reduxForm,
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
import SignupFormValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    formValues: getFormValues('signupPatient')(state),
  };
}


/*
Signup Form
================================================================================
*/
@connect(mapStateToProps, null)
@reduxForm({
  form: 'signupPatient',
  validate: SignupFormValidator,
})
@CSSModules(styles)
class SignupForm extends React.Component {

  static propTypes = {
    // passed in
    autosubmit: React.PropTypes.bool,
    offices: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // state
    formValues: React.PropTypes.object,

    // redux form
    change: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
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

  /*
  Auto Submit
  ------------------------------------------------------------
  Form auto-submit functionality inspired by comments on this github issue:
  https://github.com/erikras/redux-form/issues/537

  When a field is changed, redux-form will change it's formValue in one
  prop-update cycle and then change the valid prop in a second prop-update cycle
  (if needed).  This leads to two cases where the form is valid and can be
  submitted:

    1. The latest change fixes the last error in the form.  The formValue will
       be changed, and then valid prop will be set to `true` in a second.  This
       can be detected by comparing the old valid prop (`false`) to the new one
       (`true`).  The old / new formValue will be the same since it was already
       updated in the last prop-update cycle.

       ```
       formIsValid = this.props.valid === false
                  && nextProps.valid ==== true;
       ```

    2. The latest change alters a formValue in an already valid form. This can
       be detected by comparing the old formValues object to the new formValues,
       and discovering that they are different (thus a field has changed).
       Unfortunately the valid prop isn't updated until the next prop-update
       cycle, so it cannot be used to verify that the changed formValue is valid
       (and thus the whole form remains valid).  Thus it is necessary to
       validate the formValues as well.

       ```
       // remember: this.props.valid === nextProps.valid

       formIsValid = this.props.valid === true
                  && this.props.formValues !== nextProps.formValues
                  && Object.keys(
                       SignupFormValidator(nextProps.formValues)
                     ).length === 0;
       ```

  The code can be simplified by realizing that Case 1 is included in Case 2 the
  initial valid prop check is left out.  The previous prop-update cycle of
  Case 1 will be caught by the modified Case 2 detector, since it's in that
  cycle where the formValues change. It's a bit less efficient, since it
  validates the form every time there is a change, but in practice this doesn't
  seem to have a noticeable effect.  In all likelihood, redux-form is also
  validating the form on every change, which makes this a linear-time slowdown.
  */
  componentWillReceiveProps (nextProps) {
    const {
      // passed in
      autosubmit,
      onSubmit,
    } = this.props;

    if ( autosubmit === true                            // autosubmit is requested
      && nextProps.dirty === true                       // the form has been touched
      && this.props.formValues !== nextProps.formValues // a change was made
      && Object.keys(                                   // the form is valid (including the change)
           SignupFormValidator(nextProps.formValues)
         ).length === 0
    ) {
      onSubmit(nextProps.formValues);
    }

  }

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  getCheckbox(props) {
    return new Checkbox(props);
  }

  getSegmentedDatePicker(props) {
    return new SegmentedDatePicker(props)
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
            component={this.getInput}
            label="First Name"
            width={4}
          />

          <Field
            name="middleName"
            type="text"
            component={this.getInput}
            label="Middle Name (optional)"
            width={4}
          />

          <Field
            name="lastName"
            type="text"
            component={this.getInput}
            label="Last Name"
            width={4}
          />
        </FormGroup>

        <Row>
          <Field
            name="birthDate"
            type="date"
            component={this.getSegmentedDatePicker}
            label="Date of Birth"
            className="col-sm-6"
          />

          <Field
            name="sex"
            type="select"
            label="Sex"
            component={this.getLabeledInput}
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
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={this.getLabeledInput}
            label="Phone"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="contactMethod"
            type="select"
            label="Preferred Contact Method"
            component={this.getLabeledInput}
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
            component={this.getLabeledInput}
            label="Email Address"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="confirmEmail"
            type="text"
            component={this.getLabeledInput}
            label="Confirm Email Address"
            placeholder=""
            className="col-sm-6"
          />
        </Row>

        <Row>
          <Field
            name="password"
            type="password"
            component={this.getLabeledInput}
            label="Password"
            placeholder=""
            className="col-sm-6"
          />

          <Field
            name="confirmPassword"
            type="password"
            component={this.getLabeledInput}
            label="Confirm Password"
            placeholder=""
            className="col-sm-6"
          />

          <div className="col-sm-12">
            <h5 styleName="field-instructions">
              *Password must be at least 8 characters and include one (1) capital letter, one (1) number, and one (1) special character.
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
                  component={this.getLabeledInput}
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
                    component={this.getInput}
                  />
                </div>
              )
          }

          {/* TODO: select membership type here */}

          <div className="col-sm-4" styleName="align-with-input">
            <Field
              name="payingMember"
              component={this.getCheckbox}
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
