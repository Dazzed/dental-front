import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { contactSupportEmail } from 'common/constants';
import LabeledInput from 'components/LabeledInput';
import LoadingSpinner from 'components/LoadingSpinner';
import formValidator from './validator';


@reduxForm({
  form: 'contactSupportForm',
  validate: formValidator,
})
class ContactSupportForm extends React.Component {

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
        <Field
          name="message"
          type="textarea"
          row="10"
          component={LabeledInput}
          label="Message"
        />

        <Col md={12} style={{ opacity: 0.5, marginBottom: 10 }}>
          Your message will be sent to {' '}
          <span style={{ fontStyle: 'italic' }}>
            {contactSupportEmail}
          </span>
        </Col>

        <Col sm={3}>
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
                Send Email
              </button>
            </Col>
          </FormGroup>
        </Col>

        <div className="clearfix" />
      </form>
    );
  }
}

export default ContactSupportForm;
