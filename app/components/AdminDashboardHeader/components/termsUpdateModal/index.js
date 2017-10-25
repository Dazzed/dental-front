import React from 'react';

import ConfirmModal from 'components/ConfirmModal';
import LoadingSpinner from 'components/LoadingSpinner';

const TermsUpdateModal = props => {
  const {
    isUpdatingTerms,
    toggleTermsUpdate,
    termsUpdateRequest
  } = props;
  let message = (
    <div className="text-center">
      <p>
        Do you want to email all the verified dentists
        and patients regarding Terms & Conditions update?
      </p>
    </div>
  );
  if (isUpdatingTerms) {
    message = <p>Loading... <LoadingSpinner showOnlyIcon /></p>;
  }

  const onCancelHandler = () => {
    if (isUpdatingTerms) {
      return false;
    }
    toggleTermsUpdate(false);
  };

  const onConfirmHandler = () => {
    if (isUpdatingTerms) {
      return false;
    }
    termsUpdateRequest();
  };
  const title = 'Update Terms and Conditions';
  return (
    <ConfirmModal
      showModal
      message={message}
      onCancel={onCancelHandler}
      onConfirm={onConfirmHandler}
      title={title}
      canClose={!isUpdatingTerms}
    />
  );
};

export default TermsUpdateModal;
