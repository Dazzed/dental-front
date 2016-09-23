import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import LabeledInput from 'components/LabeledInput';
import { writeMessageFormValidator } from './formValidator';


@reduxForm({
  form: 'writeMessage',
  validate: writeMessageFormValidator,
})
class WriteMessageForm extends React.Component {

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
          name="message"
          type="textarea"
          component={LabeledInput}
          label="Message"
        />

        <Col sm={12}>
          <FormGroup>
            <Col sm={12}>
              <button
                type="submit"
                disabled={submitting}
                className="btn-cyan btn-round"
              >
                Submit
              </button>
            </Col>
          </FormGroup>
        </Col>

        <div className="clearfix" />
      </form>
    );
  }
}

export default WriteMessageForm;
