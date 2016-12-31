import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import renderDatePicker from 'components/DatePicker';
import {
  SEX_TYPES, US_STATES, PREFERRED_CONTACT_METHODS
} from 'common/constants';

import { selectUserNameParts } from 'containers/App/selectors';
import signupFinalFormValidator from './validator';


function mapStateToProps (state) {
  return {
    initialValues: selectUserNameParts(state),
  };
}

@connect(mapStateToProps)
@reduxForm({
  form: 'signupFinal',
  enableReinitialize: true,
  validate: signupFinalFormValidator,
})
class SignupFinalForm extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    offices: React.PropTypes.array,
  };

  render () {
    const { error, handleSubmit, submitting, offices } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">

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
                disabled
              />
              <Field
                name="middleName"
                type="text"
                component={Input}
                label="Middle Name"
                width={4}
                disabled
              />
              <Field
                name="lastName"
                type="text"
                component={Input}
                label="Last Name"
                width={4}
                disabled
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
                {Object.keys(US_STATES).map(key =>
                  <option value={key} key={key}>
                    {US_STATES[key]}
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
            className="col-md-6"
          />

          <Field
            name="phone"
            type="text"
            mask="(999) 999-9999"
            maskChar=" "
            component={LabeledInput}
            label="Phone"
            className="col-md-6"
          />

          <Field
            name="birthDate"
            type="date"
            component={renderDatePicker}
            label="Birthdate"
            width={6}
          />
        </Row>

        <FormGroup>
          <Row>
            <Col md={6}>
              <Field
                name="sex"
                type="select"
                label="Gender"
                component={LabeledInput}
                width={12}
              >
                <option value="">Select gender</option>
                {Object.keys(SEX_TYPES).map(key =>
                  <option value={key} key={key}>
                    {SEX_TYPES[key]}
                  </option>
                )}
              </Field>
            </Col>
            <Col md={6}>
              <Field
                name="contactMethod"
                type="select"
                label="Contact method"
                component={LabeledInput}
                width={12}
              >
                <option value="">Select preferred contact method</option>
                {Object.keys(PREFERRED_CONTACT_METHODS).map(key =>
                  <option
                    value={key}
                    key={key}
                  >
                    {PREFERRED_CONTACT_METHODS[key]}
                  </option>
                )}
              </Field>
            </Col>
            <Col md={6}>
              <Field
                name="officeId"
                type="select"
                label="Dental Office"
                component={LabeledInput}
                width={12}
              >
                <option value="">Select dental office</option>
                {offices.map(e =>
                  <option value={e.id} key={e.id}>
                    {e.officeName}
                  </option>
                )}
              </Field>
            </Col>
          </Row>
        </FormGroup>

        <Field
          name="payingMember"
          component={Checkbox}
        >
          I'll also be joining the membership
        </Field>

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

          <Col sm={3}>
            <button
              className="btn btn-block btn-round btn-outline"
              onClick={this.props.onLogout}
            >
              Skip & Logout
            </button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

export default SignupFinalForm;
