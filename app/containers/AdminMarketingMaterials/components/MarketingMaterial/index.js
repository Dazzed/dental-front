import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles, { allowMultiple: true })
export default class MarketingMaterial extends Component {
  static propTypes = {
    material: PropTypes.shape({}).isRequired,
  }

  renderMaterial = material => (
    <p>{material.name}</p>
  );

  render () {
    const { material } = this.props;
    return this.renderMaterial(material);
  }
}
