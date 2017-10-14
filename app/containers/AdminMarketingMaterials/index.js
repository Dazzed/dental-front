import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  changePageTitle,
} from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import LoadingSpinner from 'components/LoadingSpinner';

import styles from './styles.css';
import {
  fetchMaterials,
  toggleAddCategoryModal,
  addCategory,
  toggleAddMaterialModal,
  addMaterial,
  setDeletingMaterial,
  deleteMaterial,
  setDeletingCategory,
  deleteCategory,
} from './actions';
import {
  marketingMaterialsSelector,
  booleanFlagSelector,
  deletingMaterialSelector,
  deletingCategorySelector
} from './selectors';

import Modals from './components/modals';

import MarketingMaterialList from './components/MarketingMaterialList';

function mapStateToProps (state) {
  return {
    user: selectCurrentUser(state),
    marketingMaterials: marketingMaterialsSelector(state),

    isFetchingData: booleanFlagSelector(state)('isFetchingData'),
    isAddingCategory: booleanFlagSelector(state)('isAddingCategory'),
    isAddingMaterial: booleanFlagSelector(state)('isAddingMaterial'),
    isDeletingCategory: booleanFlagSelector(state)('isDeletingCategory'),
    isDeletingMaterial: booleanFlagSelector(state)('isDeletingMaterial'),
    addCategoryOpen: booleanFlagSelector(state)('addCategoryOpen'),
    addMaterialOpen: booleanFlagSelector(state)('addMaterialOpen'),
    editingCategoryId: booleanFlagSelector(state)('editingCategoryId'),

    deletingMaterial: deletingMaterialSelector(state),
    deletingCategory: deletingCategorySelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      changePageTitle,
      fetchMaterials,
      toggleAddCategoryModal,
      addCategory,
      toggleAddMaterialModal,
      addMaterial,
      setDeletingMaterial,
      deleteMaterial,
      setDeletingCategory,
      deleteCategory,
    }, dispatch);
}

@CSSModules(styles, { allowMultiple: true })
@connect(mapStateToProps, mapDispatchToProps)
export default class MarketingMaterials extends Component {

  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,
    marketingMaterials: PropTypes.array.isRequired,
  
    // ajax bools
    isFetchingData: PropTypes.bool.isRequired,
    isAddingCategory: PropTypes.bool.isRequired,
    isAddingMaterial: PropTypes.bool.isRequired,
    isDeletingCategory: PropTypes.bool.isRequired,
    isDeletingMaterial: PropTypes.bool.isRequired,
  
    // modal bools
    addCategoryOpen: PropTypes.bool.isRequired,
    addMaterialOpen: PropTypes.bool.isRequired,
  
    fetchMaterials: PropTypes.func.isRequired,
    toggleAddCategoryModal: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired,
    toggleAddMaterialModal: PropTypes.func.isRequired,
    setDeletingMaterial: PropTypes.func.isRequired,
    deleteMaterial: PropTypes.func.isRequired,
    setDeletingCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,

    deletingMaterial: PropTypes.shape({}).isRequired,
    deletingCategory: PropTypes.shape({}).isRequired,

    changePageTitle: React.PropTypes.func.isRequired,
  }

  componentWillMount () {
    if (this.props.user) {
      this.props.fetchMaterials();
    }
    this.props.changePageTitle('Marketing Materials');
  }

  render () {
    const {
      marketingMaterials,
      isFetchingData,
    } = this.props;

    if (isFetchingData) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon />
        </div>
      );
    }

    return (
      <div>
        <h1 className={styles['marketing-materials-header']}>
          Marketing Materials
        </h1>
        <hr />
        <MarketingMaterialList
          marketingMaterials={marketingMaterials}
          toggleAddCategoryModal={this.props.toggleAddCategoryModal}
          addCategory={this.props.addCategory}
          toggleAddMaterialModal={this.props.toggleAddMaterialModal}
          setDeletingMaterial={this.props.setDeletingMaterial}
          setDeletingCategory={this.props.setDeletingCategory}
        />
        <Modals {...this.props} />
      </div>
    );
  }
}
