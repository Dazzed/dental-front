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
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

// app
import InlineInput from 'components/InlineInput';

// local
import loginFormValidator from './validator';
import styles from './styles.css';

/*
Login Form
================================================================================
*/
@reduxForm({
  form: 'login',
  validate: loginFormValidator,
})
@CSSModules(styles)
class LoginForm extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-inline"
        styleName="wrapper"
      >
        <FormGroup className="has-error">
          {error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>

        <Field
          name="email"
          type="text"
          component={InlineInput}
          label="Email"
        />

        <Field
          name="password"
          type="password"
          component={InlineInput}
          label="Password"
        />

        <FormGroup>
          <input type="submit" disabled={submitting} styleName="button" value="LOG IN &gt;" />
        </FormGroup>

        <span styleName="help-link">
          <Link to="/faq">
            Need Help?
          </Link>
        </span>
      </form>
    );
  }
}

export default LoginForm;
