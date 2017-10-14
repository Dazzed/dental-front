import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { Field, reduxForm } from 'redux-form';

import LoadingSpinner from 'components/LoadingSpinner';
import LabeledInput from 'components/LabeledInput';

import styles from './styles.css';

@reduxForm({
  form: 'addCategory',
  enableReinitialize: true,
})
@CSSModules(styles)
export default class AddCategoryModal extends React.Component {

  getLabeledInput (props) {
    return new LabeledInput(props);
  }

  onModalCancel = () => {
    this.props.toggleAddCategoryModal(false);
  }

  renderModalFooter = () => {
    const {
      isAddingCategory,
      pristine,
      submit,
    } = this.props;
    if (isAddingCategory) {
      return <div style={{ textAlign: 'right' }}><LoadingSpinner /></div>;
    }
    return (
      <Modal.Footer>
        <div className="modal-controls">
          <input
            type="button"
            className="modal-control"
            disabled={pristine}
            value="ADD CATEGORY"
            onClick={submit}
          />
        </div>
      </Modal.Footer>
    );
  }

  render () {
    const {
      addCategoryOpen,
      addCategory,
      handleSubmit,
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        show={addCategoryOpen}
        onHide={this.onModalCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
          >
            <Row>
              <Field
                name="name"
                type="text"
                component={this.getLabeledInput}
                label="Category Name"
                placeholder=""
                width={6}
                className="col-sm-12"
              />
            </Row>
          </form>
        </Modal.Body>
        {this.renderModalFooter()}
      </Modal>
    );
  }
}
