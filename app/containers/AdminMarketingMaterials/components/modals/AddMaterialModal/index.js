import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';

import { getItem } from 'utils/localStorage';
import LoadingSpinner from 'components/LoadingSpinner';
import LabeledInput from 'components/LabeledInput';

import styles from './styles.css';

const ReactS3Uploader = require('react-s3-uploader');

const log = arg => console.log(arg);

const authToken = getItem('auth_token');
const headers = {
  Authorization: `JWT ${authToken}`
};

@CSSModules(styles)
export default class AddMaterialModal extends React.Component {

  componentWillMount () {
    this.state = {
      callback: null,
      file: null,
      uploadInProgress: false
    };
  }

  getLabeledInput (props) {
    return new LabeledInput(props);
  }

  renderModalFooter = () => {
    const {
      isAddingMaterial,
    } = this.props;
    const {
      uploadInProgress
    } = this.state;
    const {
      callback,
      file
    } = this.state;
    if (isAddingMaterial || uploadInProgress) {
      return <div style={{ textAlign: 'right' }}><LoadingSpinner /></div>;
    } else if (file && !isAddingMaterial) {
      const onClickHandler = () => {
        this.setState({ uploadInProgress: true }, () => callback(file));
      };
      return (
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              value="UPLOAD FILE"
              onClick={onClickHandler}
            />
          </div>
        </Modal.Footer>
      );
    } else if (!file && !isAddingMaterial) {
      return '';
    }
  }

  onModalCancel = () => {
    this.props.toggleAddMaterialModal({ flag: false, categoryId: null });
  }

  onUploadStart = (file, next) => {
    this.setState({
      callback: next,
      file,
    });
  }

  onUploadProgress = (percent, message) => {

  }

  onUploadError = (message) => {
    log('______________');
    log('onUploadError');
    log(message);
    log('______________');
    const { toastError } = this.props;
    toastError('File format not supported .\nPlease upload a different file type.');
    this.setState({ uploadInProgress: false }, this.props.addMaterialError);
  }

  onUploadFinish = (signResult) => {
    const { addMaterial, editingCategoryId } = this.props;
    const { fileKey } = signResult;
    this.setState({ uploadInProgress: false });
    addMaterial({ fileKey, categoryId: editingCategoryId });
  }

  render () {
    const {
      addMaterialOpen,
    } = this.props;

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        show={addMaterialOpen}
        onHide={this.onModalCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactS3Uploader
            signingUrl="/api/v1/marketing_materials/s3/sign"
            signingUrlMethod="GET"
            accept="image/*"
            preprocess={this.onUploadStart}
            onProgress={this.onUploadProgress}
            onError={this.onUploadError}
            onFinish={this.onUploadFinish}
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
            contentDisposition="auto"
            signingUrlHeaders={headers}
          />
        </Modal.Body>
        {this.renderModalFooter()}
      </Modal>
    );
  }
}
