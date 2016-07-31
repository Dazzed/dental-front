import React from 'react';
import _ from 'lodash';  // eslint-disable-line id-length

import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import { reduxForm, addArrayValue } from 'redux-form';
import { showFamilyMemberForm, register } from 'redux/modules/signup';

import { PREFERRED_CONTACT_METHODS } from 'utils/constants';

import style from './ProfileInformation.scss';
import AvatarField from 'components/AvatarField/AvatarField';
import DatePicker from 'components/DatePicker/DatePicker';

import validate from './profileInformationValidation';
import { validateState } from 'utils/bootstrap';


const fields = [
  'email',
  'confirmEmail',
  'password',
  'confirmPassword',
  'firstName',
  'middleName',
  'lastName',
  'birthDate',
  'phone',
  'sex',
  'address',
  'city',
  'state',
  'zipCode',
  'contactMethod',
  'accountHolder',
  'tos',
  'avatar',
  'familyMembers[]',
  'familyMembers[].avatar',
  'familyMembers[].avatarImage',
  'familyMembers[].firstName',
  'familyMembers[].lastName',
  'familyMembers[].relationship',
  'familyMembers[].birthDate',
  'familyMembers[].phone',
  'familyMembers[].email',
  'familyMembers[].accountType',
];


const submit = (values, dispatch) => {
  const action = register(values);
  dispatch(action);
};


/**
 * This is used as a main form to avoid bind on the parent all the events.
 *
 */
@reduxForm({
  form: 'signup',
  fields,
  validate,
}, undefined, {
  addValue: addArrayValue,
  showFamilyMemberForm,
})
class ProfileInformation extends React.Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    showFamilyMemberForm: React.PropTypes.func.isRequired,
    addValue: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  handleAddMemberFamily = () => {
    this.props.addValue('signup', 'familyMembers', {});
    this.props.showFamilyMemberForm(this.props.fields.familyMembers.length);
  }

  render() {
    const { fields:
      { firstName, lastName, middleName, birthDate, phone, sex, address,
        city, state, zipCode, contactMethod, accountHolder, tos, avatar,
      },
      submitting, handleSubmit,
    } = this.props;

    return (
      <Well><form method="post" onSubmit={handleSubmit(submit)}>

        <h3>Profile Infomation</h3>

        <Row>
          <Col md={4}>
            <AvatarField {...avatar} form="signup" />
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <FormGroup >
              <ControlLabel>Name</ControlLabel>
              <Row>
                <Col md={4}>
                  <FormGroup
                    validationState={validateState(firstName)}
                  >
                    <FormControl
                      type="text"
                      placeholder="First Name"
                      {...firstName}
                    />
                    <FormControl.Feedback />
                    {firstName.touched && firstName.error &&
                      <HelpBlock>{firstName.error}</HelpBlock>}
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormControl
                    type="text"
                    placeholder="Middle Name (optional)"
                    {...middleName}
                  />
                  <FormControl.Feedback />
                  {middleName.touched && middleName.error &&
                    <HelpBlock>{middleName.error}</HelpBlock>}
                </Col>
                <Col md={4}>
                  <FormGroup
                    validationState={validateState(lastName)}
                  >
                    <FormControl
                      type="text"
                      placeholder="Last Name"
                      {...lastName}
                    />
                    <FormControl.Feedback />
                    {lastName.touched && lastName.error &&
                      <HelpBlock>{lastName.error}</HelpBlock>}
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <FormGroup
              controlId="birthDate"
              validationState={validateState(birthDate)}
            >
              <ControlLabel>Date of Birth</ControlLabel>
              <DatePicker {...birthDate} form="signup" />
              <FormControl.Feedback />
              {birthDate.touched && birthDate.error &&
                <HelpBlock>{birthDate.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup
              controlId="phone"
              validationState={validateState(phone)}
            >
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl type="text" {...phone} />
              <FormControl.Feedback />
              {phone.touched && phone.error &&
                <HelpBlock>{phone.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <FormGroup
              controlId="sex"
              validationState={validateState(sex)}
            >
              <ControlLabel>Sex</ControlLabel>
              <FormControl componentClass="select" {...sex} >
                <option></option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </FormControl>
              <FormControl.Feedback />
              {sex.touched && sex.error &&
                <HelpBlock>{sex.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup
              controlId="address"
              validationState={validateState(address)}
            >
              <ControlLabel>Address</ControlLabel>
              <FormControl type="text" {...address} />
              <FormControl.Feedback />
              {address.touched && address.error &&
                <HelpBlock>{address.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <FormGroup
              controlId="city"
              validationState={validateState(city)}
            >
              <ControlLabel>City</ControlLabel>
              <FormControl type="text" {...city} />
              <FormControl.Feedback />
              {city.touched && city.error &&
                <HelpBlock>{city.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={5} mdOffset={2}>
            <FormGroup
              controlId="state"
              validationState={validateState(state)}
            >
              <ControlLabel>State</ControlLabel>
              <FormControl type="text" {...state} />
              <FormControl.Feedback />
              {state.touched && state.error &&
                <HelpBlock>{state.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <FormGroup
              controlId="zipCode"
              validationState={validateState(zipCode)}
            >
              <ControlLabel>Zip Code</ControlLabel>
              <FormControl type="text" {...zipCode} />
              <FormControl.Feedback />
              {zipCode.touched && zipCode.error &&
                <HelpBlock>{zipCode.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={5} mdOffset={2}>
            <FormGroup
              controlId="contactMethod"
            >
              <ControlLabel>Preferred Contact Method</ControlLabel>
              <FormControl componentClass="select" {...contactMethod} >
                <option></option>
                {_.map(PREFERRED_CONTACT_METHODS, (value, key) =>
                  <option value={key} key={key}>{value}</option>
                )}
              </FormControl>
              <FormControl.Feedback />
              {contactMethod.touched && contactMethod.error &&
                <HelpBlock>{contactMethod.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} mdOffset={6}>
            <FormGroup
              controlId="accountHolder"
            >
              <Checkbox {...accountHolder} checked={accountHolder.value}>
                <strong>
                  Will they primary account holder be joining the membership
                </strong>
              </Checkbox>
              <FormControl.Feedback />
              {accountHolder.touched && accountHolder.error &&
                <HelpBlock>{accountHolder.error}</HelpBlock>}
            </FormGroup>
          </Col>
          <Col md={6} mdOffset={6}>
            <FormGroup
              controlId="tos"
              validationState={validateState(tos)}
            >
              <Checkbox {...tos} checked={tos.value}>
                <strong>
                  I have read and accept the Terms of Conditions
                </strong>
              </Checkbox>
              <FormControl.Feedback />
              {tos.touched && tos.error &&
                <HelpBlock>{tos.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12} bsClass={`${style.checkoutInfo} col`}>
            <Button
              className="rounded pull-right"
              bsStyle="default"
              type="submit"
              disabled={submitting}
            >
              Checkout
            </Button>
            <p className="pull-right">Total Amount <span>$300</span></p>
          </Col>
        </Row>

        <Row>
          <Col md={6} mdOffset={6}>
            <Button
              className="rounded dark-green"
              bsStyle="default"
              disabled={submitting}
              onClick={this.handleAddMemberFamily}
            >
              <FontAwesome name="plus" /> Add family members
            </Button>

            <Button
              className="rounded pull-right dark-green"
              bsStyle="default"
              disabled={submitting}
            >
              <FontAwesome name="plus" /> Add custom membership
            </Button>
          </Col>
        </Row>
      </form></Well>
    );
  }
}


export default ProfileInformation;

