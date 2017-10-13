import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import CaretDown from 'react-icons/lib/fa/caret-down';
import CaretRight from 'react-icons/lib/fa/caret-right';

import styles from './styles.css';

@CSSModules(styles, { allowMultiple: true })
export default class MarketingMaterial extends Component {
  static propTypes = {
    marketingMaterial: PropTypes.shape({}).isRequired,
  }

  componentWillMount () {
    this.state = {
      isOpen: false
    };
  }

  handleCaretToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  renderCaret = () => (this.state.isOpen ? <CaretDown /> : <CaretRight />)

  renderMaterials = category => {
    return category.materials.map(material => {
      return (
        <div className="col-sm-12" key={material.id}>
          {material.url}
        </div>
      );
    });
  }

  renderCategory = category => (
    <div>
      <div className="row" onClick={this.handleCaretToggle}>
        <div className="col-sm-4">
          {category.name}
        </div>
        <div className="col-sm-2">
          {this.renderCaret()}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {this.renderMaterials(category)}
        </div>
      </div>
    </div>
  );

  render () {
    console.log(this.props)
    const { marketingMaterial: category } = this.props;
    return this.renderCategory(category);
  }
}
