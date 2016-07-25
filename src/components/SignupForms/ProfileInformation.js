import React from 'react';
import _ from 'lodash';  // eslint-disable-line id-length

import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { reduxForm } from 'redux-form';

import { PREFERRED_CONTACT_METHODS } from 'utils/constants';


const fields = [
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
];


@reduxForm({
  form: 'signup',
  fields,
})
class ProfileInformation extends React.Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
  };

  render() {
    const { fields:
      { firstName, lastName, middleName, birthDate, phone, sex, address,
        city, state, zipCode, contactMethod,
      },
    } = this.props;

    return (
      <Well>
        <h3>Profile Infomation</h3>

        <Row>
          <Col md={10}>
            <FormGroup >
              <ControlLabel>Name</ControlLabel>
              <Row>
                <Col md={4}>
                  <FormControl
                    type="text"
                    placeholder="First Name"
                    {...firstName}
                  />
                  <FormControl.Feedback />
                  {firstName.touched && firstName.error &&
                    <HelpBlock>{firstName.error}</HelpBlock>}
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
                  <FormControl
                    type="text"
                    placeholder="Last Name"
                    {...lastName}
                  />
                  <FormControl.Feedback />
                  {lastName.touched && lastName.error &&
                    <HelpBlock>{lastName.error}</HelpBlock>}
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <FormGroup
              controlId="birthDate"
            >
              <ControlLabel>Date of Birth</ControlLabel>
              <FormControl
                type="text"
                placeholder="WIP DATE WIDGET"
                {...birthDate}
              />
              <FormControl.Feedback />
              {birthDate.touched && birthDate.error &&
                <HelpBlock>{birthDate.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup
              controlId="phone"
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
          <Col md={12}>
            <FormGroup
              controlId="contactMethod"
              className="pull-right"
            >
              <Checkbox>
                <strong>
                  Will they primary account holder be joining the membership
                </strong>
              </Checkbox>
              <FormControl.Feedback />
              {contactMethod.touched && contactMethod.error &&
                <HelpBlock>{contactMethod.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>
      </Well>
    );
  }
}


export default ProfileInformation;

