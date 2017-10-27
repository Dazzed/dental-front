import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {
  Field,
  formValueSelector,
  reduxForm,
  submit as submitForm
} from 'redux-form';

import LoadingSpinner from 'components/LoadingSpinner';
import Checkbox from 'components/Checkbox';
import LabeledInput from 'components/LabeledInput';

import styles from './styles.css';
import AdminAccountSecurityFormValidator from './validator';

/*
Member Form Modal
================================================================================
*/
@reduxForm({
  form: 'adminAccountSecurity',
  enableReinitialize: true,
  validate: AdminAccountSecurityFormValidator,
})
@CSSModules(styles)
export default class AccountSecurityFormModal extends React.Component {

  static propTypes = {
    // form related - passed in
    handleSubmit: PropTypes.func,
    submit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,

    // modal related - passed in
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isUpdatingSecuritySettings: PropTypes.bool.isRequired
  };

  getCheckbox (props) {
    return new Checkbox(props);
  }

  getLabeledInput (props) {
    return new LabeledInput(props);
  }

  handleFormSubmit = (values) => {
    const {
      isUpdatingSecuritySettings
    } = this.props;
    if (!isUpdatingSecuritySettings) {
      this.props.onSubmit(values);
    }
  }
  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // form related
      handleSubmit,
      // modal related
      show,
      onCancel,
      isUpdatingSecuritySettings,
      valid,
      pristine
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
          <Modal.Title>Edit Login &amp; Security Settings</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form
            className="form-horizontal"
          >
            <Row>
              <Field
                name="newPassword"
                type="password"
                component={this.getLabeledInput}
                label="New Password"
                placeholder=""
                className="col-sm-6"
              />

              <Field
                name="confirmNewPassword"
                type="password"
                component={this.getLabeledInput}
                label="Confirm New Password"
                placeholder=""
                className="col-sm-6"
              />

              <div className="col-sm-12">
                <h5 styleName="field-instructions">
                  *Password must be at least 8 characters and include one (1) capital letter, one (1) number.
                </h5>
              </div>
            </Row>

            <Row>
              <Field
                name="password"
                type="password"
                component={this.getLabeledInput}
                label="Current Password"
                placeholder=""
                className="col-sm-6"
              />
            </Row>

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
              disabled={isUpdatingSecuritySettings || !valid || pristine}
              onClick={handleSubmit(this.handleFormSubmit)}
              value={isUpdatingSecuritySettings ? 'Loading...' : 'Update Security Settings'}
            />
            {isUpdatingSecuritySettings && <LoadingSpinner showOnlyIcon />}
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
