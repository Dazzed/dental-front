import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import LabeledInput from 'components/LabeledInput';
import loginFormValidator from './validator';
import styles from './styles.css';


@reduxForm({
  form: 'login',
  validate: loginFormValidator,
})
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
        className={`form-horizontal ${styles.wrapper}`}
      >

        <Row>
          <Field
            name="email"
            type="text"
            component={LabeledInput}
            label="Email"
          />

          <Field
            name="password"
            type="password"
            component={LabeledInput}
            label="Password"
          />
        </Row>

        <FormGroup className="has-error">
          <Col sm={12}>
            {error && <HelpBlock>{error}</HelpBlock>}
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={6} smPush={6}>
            <button
              type="submit"
              disabled={submitting}
              className="btn-bg btn-cyan btn-round"
            >
              Log In
            </button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

export default LoginForm;
