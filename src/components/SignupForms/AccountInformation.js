import React from 'react';

import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { reduxForm } from 'redux-form';

import validate from './accountInformationValidation';
import { validateState } from 'utils/bootstrap';


const fields = [
  'email',
  'confirmEmail',
  'password',
  'confirmPassword',
];


@reduxForm({
  form: 'signup',
  fields,
  validate,
})
class AccountInformation extends React.Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
  };

  render() {
    const { fields:
      { email, confirmEmail, password, confirmPassword },
    } = this.props;

    return (
      <Well>
        <h3>Account information</h3>

        <Row>
          <Col md={8}>
            <FormGroup
              controlId="email"
              validationState={validateState(email)}
            >
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="text"
                placeholder="example@domain.com"
                {...email}
              />
              <FormControl.Feedback />
              {email.touched && email.error &&
                <HelpBlock>{email.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <FormGroup
              controlId="confirmEmail"
              validationState={validateState(confirmEmail)}
            >
              <ControlLabel>Confirm Email Address</ControlLabel>
              <FormControl
                type="text"
                placeholder="example@domain.com"
                {...confirmEmail}
              />
              <FormControl.Feedback />
              {confirmEmail.touched && confirmEmail.error &&
                <HelpBlock>{confirmEmail.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup
              controlId="password"
              validationState={validateState(password)}
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" {...password} />
              <FormControl.Feedback />
              {password.touched && password.error &&
                <HelpBlock>{password.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup
              controlId="confirmPassword"
              validationState={validateState(confirmPassword)}
            >
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl type="password" {...confirmPassword} />
              <FormControl.Feedback />
              {confirmPassword.touched && confirmPassword.error &&
                <HelpBlock>{confirmPassword.error}</HelpBlock>}
            </FormGroup>
          </Col>
        </Row>
      </Well>
    );
  }
}


export default AccountInformation;
