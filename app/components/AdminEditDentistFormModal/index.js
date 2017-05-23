/*
Member Form Modal Component
================================================================================
TODO: add a membership type field
*/

/*
Import
------------------------------------------------------------
*/
// libs
import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import FaClose from 'react-icons/lib/fa/close';
import { Field, reduxForm, } from 'redux-form';

// app
import {
  SEX_TYPES,
  PREFERRED_CONTACT_METHODS,
  MEMBER_RELATIONSHIP_TYPES,
} from 'common/constants';
import renderDatePicker from 'components/DatePicker';
import LabeledInput from 'components/LabeledInput';

// local
import styles from './styles.css';
import MemberValidator from './validator';


/*
Member Form Modal
================================================================================
*/
@reduxForm({
  form: 'adminEditDentist',
  enableReinitialize: true,
  validate: MemberValidator,
})
@CSSModules(styles, { allowMultiple: true })
export default class AdminEditDentistFormModal extends React.Component {

  static propTypes = {
    // form related
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  handleFormSubmit = (values) => {
    this.props.onSubmit(values);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  render () {
    const {
      // form related
      initialValues,
      handleSubmit,
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
          <Modal.Title>Edit Dentist</Modal.Title>

          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting}
              onClick={handleSubmit(this.handleFormSubmit)}
              value="Save"
            />
          </div>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form className="form-horizontal">
            <Row>
              <Field
                name="firstName"
                type="text"
                component={this.getLabeledInput}
                label="First Name"
                className="col-md-6"
              />

              <Field
                name="lastName"
                type="text"
                component={this.getLabeledInput}
                label="Last Name"
                className="col-md-6"
              />
            </Row>

            <Row>
              <Field
                name="phone"
                type="text"
                mask="(999) 999-9999"
                maskChar=" "
                component={this.getLabeledInput}
                label="Contact Phone Number"
                placeholder=""
                className="col-sm-6"
              />
            </Row>
          </form>
        </Modal.Body>

      </Modal>
    );
  }
}
