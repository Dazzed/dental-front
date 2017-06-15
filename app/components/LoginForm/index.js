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

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
        styleName="wrapper"
      >

        <Row>
          <Field
            name="email"
            type="text"
            component={this.getLabeledInput}
            label="Email"
            placeholder="Email"
          />

          <Field
            name="password"
            type="password"
            component={this.getLabeledInput}
            label="Password"
            placeholder="Password"
          />
        </Row>
        <div className="pull-right">
          <Link to="/accounts/forgot-password">Forgot Password?</Link>
        </div>

        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>
        <div className="clearfix"></div>
        <div className="text-center">
          <input type="submit" disabled={submitting} styleName="button" value="Log In &gt;" />
        </div>
      </form>
    );
  }
}

export default LoginForm;
