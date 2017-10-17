import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import MarketingMaterial from '../MarketingMaterial';

@CSSModules(styles, { allowMultiple: true })
export default class MarketingMaterialList extends Component {
  static propTypes = {
    marketingMaterials: PropTypes.array.isRequired,
    toggleAddCategoryModal: PropTypes.func.isRequired,
    toggleAddMaterialModal: PropTypes.func.isRequired,
    setDeletingMaterial: PropTypes.func.isRequired,
    setDeletingCategory: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,
  }

  componentWillMount () {
    this.state = {
      expandedCategories: {}
    };
  }

  renderMaterials = (marketingMaterial) => {
    const {
      toggleAddMaterialModal,
      setDeletingMaterial,
      setDeletingCategory,
      user
    } = this.props;
    return marketingMaterial.map(material => (
      <MarketingMaterial
        key={material.id}
        marketingMaterial={material}
        toggleAddMaterialModal={toggleAddMaterialModal}
        setDeletingMaterial={setDeletingMaterial}
        setDeletingCategory={setDeletingCategory}
        user={user}
      />
    ));
  }

  renderAddCategoryButton = () => {
    const { user } = this.props;
    if (user.type === 'admin') {
      return (
        <div>
          <input
            type="button"
            value="ADD CATEGORY"
            styleName="add-category-button"
            onClick={() => this.props.toggleAddCategoryModal(true)}
          />
        </div>
      );
    }
    return '';
  }

  render () {
    const { marketingMaterials } = this.props;
    return (
      <div className={styles['material-list-container']}>
        {this.renderMaterials(marketingMaterials)}
        {this.renderAddCategoryButton()}
      </div>
    );
  }
}
