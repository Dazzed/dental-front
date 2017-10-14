import React, { Component } from 'react';

import AddCategoryModal from './AddCategoryModal';
import AddMaterialModal from './AddMaterialModal';
import DeleteMaterialModal from './DeleteMaterialModal';
import DeleteCategoryModal from './DeleteCategoryModal';

export default class Modals extends Component {

  submitCategory = values => {
    this.props.addCategory(values);
  }

  render () {
    return (
      <div>
        <AddCategoryModal {...this.props} onSubmit={this.submitCategory} />
        <AddMaterialModal {...this.props} />
        <DeleteMaterialModal {...this.props} />
        <DeleteCategoryModal {...this.props} />
      </div>
    );
  }
}
