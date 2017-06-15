/*
Login Form Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import { Link } from 'react-router';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import { Field, reduxForm } from 'redux-form';

// app
import LabeledInput from 'components/LabeledInput';

// local
import passwordResetFormValidator from './validator';
import styles from './styles.css';

/*
Login Form
================================================================================
*/
@reduxForm({
  form: 'reset_password',
  validate: passwordResetFormValidator,
})
@CSSModules(styles)
class PasswordResetForm extends React.Component {
  componentWillMount() {
    this.state = {
    };
  }

  handleChange = e => {
    const { name, value } = e.target || e.srcElement;
    this.setState({ [name]: value });
  };

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render() {
    const { newPassword, confirmNewPassword } = this.state;
    const customError = newPassword !== confirmNewPassword ? 'Passwords do not match' : '';
    const { error = customError, handleSubmit, submitting, token } = this.props;


    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
        styleName="wrapper"
      >

        <Row>
          <Field
            name="newPassword"
            type="password"
            onChange={this.handleChange}
            component={this.getLabeledInput}
            label="New Password"
            placeholder="Password"
          />

          <Field
            name="confirmNewPassword"
            type="password"
            onChange={this.handleChange}
            component={this.getLabeledInput}
            label="New Password Again"
            placeholder="Password"
          />

          <input
            name="token"
            type="hidden"
            value={token}
          />

        </Row>
        <div className="pull-right">
          <Link to="/accounts/login">Back to Login Page</Link>
        </div>
        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>

        <div className="text-center">
          <input type="submit" disabled={submitting || newPassword !== confirmNewPassword || !newPassword} styleName="button" value="Set New Password &gt;" />
        </div>
      </form>
    );
  }
}

export default PasswordResetForm;
