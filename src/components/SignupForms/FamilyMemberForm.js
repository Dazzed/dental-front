import React from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import DatePicker from 'react-bootstrap-date-picker';

import AvatarField from 'components/AvatarField/AvatarField';


export default class FamilyMemberForm extends React.Component {

  static propTypes = {
    member: React.PropTypes.object.isRequired,
  };

  constructor(props, context, updater) {
    super(props, context, updater);
  }

  render() {
    const { member:
      { avatar, firstName, lastName, relationship, birthDate, phone,
        email, accountType }
    } = this.props;

    return (
      <div>

        <Row>
          <Col md={4}>
            <AvatarField form="signup" {...avatar} />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup
              controlId="firstNameChild"
            >
              <ControlLabel>First Name</ControlLabel>
              <FormControl type="text" {...firstName} />
              <FormControl.Feedback />
              {firstName.touched && firstName.error &&
                <HelpBlock>{firstName.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup
              controlId="lastNameChild"
            >
              <ControlLabel>Last Name</ControlLabel>
              <FormControl type="text" {...lastName} />
              <FormControl.Feedback />
              {lastName.touched && lastName.error &&
                <HelpBlock>{lastName.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup
              controlId="relationshipChild"
            >
              <ControlLabel>Family Relationship</ControlLabel>
              <FormControl type="text" {...relationship} />
              <FormControl.Feedback />
              {relationship.touched && relationship.error &&
                <HelpBlock>{relationship.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup
              controlId="birthDateChild"
            >
              <ControlLabel>Birthdate</ControlLabel>
              <DatePicker {...birthDate} />
              <FormControl.Feedback />
              {birthDate.touched && birthDate.error &&
                <HelpBlock>{birthDate.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup
              controlId="phoneChild"
            >
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl type="text" {...phone} />
              <FormControl.Feedback />
              {phone.touched && phone.error &&
                <HelpBlock>{phone.error}</HelpBlock>}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup
              controlId="emailChild"
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl type="text" {...email} />
              <FormControl.Feedback />
              {email.touched && email.error &&
                <HelpBlock>{email.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup
              controlId="accountTypeChild"
            >
              <ControlLabel>Account Type</ControlLabel>
              <FormControl type="text" {...accountType} />
              <FormControl.Feedback />
              {accountType.touched && accountType.error &&
                <HelpBlock>{accountType.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }

}
