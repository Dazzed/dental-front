import React, { Component } from 'react';
import ConfirmModal from 'components/ConfirmModal';
import LoadingSpinner from 'components/LoadingSpinner';

class DeleteMaterialModal extends Component {
  render () {
    const {
      deletingCategory,
      setDeletingCategory,
      deleteCategory,
      isDeletingCategory
    } = this.props;
    const { id, name } = deletingCategory;
    if (!id) {
      return null;
    }
    
    let message = (
      <div>
        Do you want to delete <strong>{name}</strong> Category?
      </div>
    );
    if (isDeletingCategory) {
      message = (
        <div className="text-center">
          Deleting <strong>{name}</strong> Category...<LoadingSpinner showOnlyIcon />
        </div>
      );
    }
    const onCancel = () => {
      if (!isDeletingCategory) {
        setDeletingCategory({ id: null, name: null });
      }
    };
    const onConfirm = () => {
      if (!isDeletingCategory) {
        deleteCategory(deletingCategory.id);
      }
    };
    const title = 'Confirm Delete Category';


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
