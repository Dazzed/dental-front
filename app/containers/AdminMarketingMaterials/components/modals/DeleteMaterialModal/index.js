import React, { Component } from 'react';
import ConfirmModal from 'components/ConfirmModal';
import LoadingSpinner from 'components/LoadingSpinner';

class DeleteMaterialModal extends Component {
  render () {
    const {
      deletingMaterial,
      setDeletingMaterial,
      deleteMaterial,
      isDeletingMaterial
    } = this.props;
    const { id, name } = deletingMaterial;
    if (!id) {
      return null;
    }
    
    let message = (
      <div>
        Do you want to delete <strong>{name}</strong>?
      </div>
    );
    if (isDeletingMaterial) {
      message = (
        <div className="text-center">
          Deleting <strong>{name}</strong>...<LoadingSpinner showOnlyIcon />
        </div>
      );
    }
    const onCancel = () => {
      if (!isDeletingMaterial) {
        setDeletingMaterial({ id: null, name: null });
      }
    };
    const onConfirm = () => {
      if (!isDeletingMaterial) {
        deleteMaterial(deletingMaterial.id);
      }
    };
    const title = 'Confirm Delete Material';


    return (
      <ConfirmModal
        showModal
        message={message}
        onCancel={onCancel}
        onConfirm={onConfirm}
        title={title}
      />
    );
  }
}

export default DeleteMaterialModal;
