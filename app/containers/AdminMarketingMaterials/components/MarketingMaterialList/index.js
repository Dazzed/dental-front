import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import MarketingMaterial from '../MarketingMaterial';

@CSSModules(styles, { allowMultiple: true })
export default class MarketingMaterialList extends Component {
  static propTypes = {
    marketingMaterials: PropTypes.array.isRequired,
  }

  componentWillMount () {
    this.state = {
      expandedCategories: {}
    };
  }

  renderMaterials = (materials) => {
    return materials.map(material => (
      <MarketingMaterial
        key={material.id}
        material={material}
      />
    ));
  }

  render () {
    const { marketingMaterials } = this.props;
    return (
      <div>
        {this.renderMaterials(marketingMaterials)}
      </div>
    );
  }
}
