import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import forOwn from 'lodash/forOwn';

import LabeledInput from 'components/LabeledInput';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import renderDatePicker from 'components/DatePicker';
import LoadingSpinner from 'components/LoadingSpinner';
import { US_STATES, PREFERRED_CONTACT_METHODS } from 'common/constants';

import profileFormValidator from './validator';

@reduxForm({
  form: 'profile',
  enableReinitialize: true,
  validate: profileFormValidator,
})
class ProfileForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
  };

  render () {
    const { handleSubmit, isSaving } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
      >
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
                {US_STATES &&
                  US_STATES.map(key => (
                    <option value={key}, key={key}>
                      US_STATES[key]
                    </option>
                  ));
                }
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
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Field>
        </Row>

        <Row>
          <Field
            name="contactMethod"
            type="select"
            label="Gender"
            component={LabeledInput}
            width={5}
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
        </Row>

        <FormGroup>
          <Col sm={12}>
            <Field
              name="payingMember"
              component={Checkbox}
            >
              I'll also be joining the membership
            </Field>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-padding btn-cyan btn-round"
            >
              {isSaving &&
                <LoadingSpinner size={16} />
              }
              Save
            </button>
          </Col>
        </FormGroup>

      </form>
    );
  }
}

export default ProfileForm;
