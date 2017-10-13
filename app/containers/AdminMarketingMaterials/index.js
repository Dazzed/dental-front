import React, { Component, PropTypes } from "react";
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCurrentUser } from 'containers/App/selectors';
import LoadingSpinner from 'components/LoadingSpinner';

import styles from './styles.css';
import {
  fetchMaterials
} from './actions';
import {
  marketingMaterialsSelector,
  booleanFlagSelector,
} from './selectors';

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
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      fetchMaterials
    }, dispatch);
}

@CSSModules(styles, { allowMultiple: true })
@connect(mapStateToProps, mapDispatchToProps)
export default class MarketingMaterials extends Component {

  static propTypes = {
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
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

    fetchMaterials: PropTypes.func.isRequired
  }

  componentWillMount () {
    if (this.props.user) {
      this.props.fetchMaterials();
    }
  }

  render () {
    const {
      marketingMaterials,
      isFetchingData
    } = this.props;

    if (isFetchingData) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon />
        </div>
      );
    }

    return (
      <MarketingMaterialList
        marketingMaterials={marketingMaterials}
      />
    );
  }
}
