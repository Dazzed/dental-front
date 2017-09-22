/*
Patient Profile Form Modal Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm, submit as submitForm } from 'redux-form';

// app
import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import PatientProfileValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('patientProfile')),
});


/*
Member Form Modal
================================================================================
*/
@connect(null, mapDispatchToProps)
@reduxForm({
  form: 'patientProfile',
  enableReinitialize: true,
  validate: PatientProfileValidator,
})
@CSSModules(styles)
export default class PatientProfileFormModal extends React.Component {

  static propTypes = {
    // form related - passed in
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related - passed in
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // form related
      initialValues,
      handleSubmit,
      submit,
      submitting,

      // modal related
      show,
      onCancel,
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        onHide={onCancel}
        show={show}
      >
        {/*
        Modal Header
        ------------------------------------------------------------
        */}
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="form-horizontal"
          >
           <Row>
              <Field
                name="email"
                type="text"
                component={this.getLabeledInput}
                label="Email"
                placeholder=""
                className="col-sm-12"
              />
            </Row>

            <FormGroup>
              <Col sm={12}>
                <ControlLabel>Name</ControlLabel>
              </Col>

              <Row>
                <Col md={12}>
                  <Field
                    name="firstName"
                    type="text"
                    component={this.getInput}
                    label="First Name"
                    width={4}
                  />

                  <Field
                    name="middleName"
                    type="text"
                    component={this.getInput}
                    label="Middle Name"
                    width={4}
                  />

                  <Field
                    name="lastName"
                    type="text"
                    component={this.getInput}
                    label="Last Name"
                    width={4}
                  />
                </Col>
              </Row>
            </FormGroup>

          </form>
        </Modal.Body>

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting}
              onClick={submit}
              value="Update Profile"
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
