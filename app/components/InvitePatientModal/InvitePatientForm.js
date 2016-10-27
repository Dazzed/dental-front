import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import LabeledInput from 'components/LabeledInput';
import formValidator from './validator';


@reduxForm({
  form: 'invitePatient',
  validate: formValidator,
})
class InvitePatientForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
      >
        <Field
          name="email"
          type="text"
          component={LabeledInput}
          label="Email Address"
          width={12}
        />

        <Field
          name="message"
          type="textarea"
          component={LabeledInput}
          label="Message"
        />

        <Col sm={3}>
          <FormGroup>
            <Col sm={12}>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-block btn-cyan btn-round"
              >
                Invite Client
              </button>
            </Col>
          </FormGroup>
        </Col>

        <div className="clearfix" />
      </form>
    );
  }
}

export default InvitePatientForm;
