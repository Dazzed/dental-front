import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import CaretDown from 'react-icons/lib/fa/caret-down';
import CaretRight from 'react-icons/lib/fa/caret-right';
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o';

import styles from './styles.css';

@CSSModules(styles, { allowMultiple: true })
export default class MarketingMaterial extends Component {
  static propTypes = {
    marketingMaterial: PropTypes.shape({}).isRequired,
    setDeletingMaterial: PropTypes.func.isRequired,
    setDeletingCategory: PropTypes.func.isRequired,
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

  deleteCategory = category => {
    this.props.setDeletingCategory({ id: category.id, name: category.name });
  }

  renderCaret = () => (this.state.isOpen ? <CaretDown /> : <CaretRight />)

  renderMaterials = category => {
    const { toggleAddMaterialModal } = this.props;
    const { isOpen } = this.state;
    if (isOpen) {
      const materials = category.materials.map(material => {
        const materialName = material.url.split('.com')[1].split('_')[1];
        return (
          <div key={material.id}>
            <span>
              <a href={material.url} target="_blank">{materialName}</a>
            </span>
            <span
              className={styles['remove-material-icon']}
              onClick={() => this.props.setDeletingMaterial({
                id: material.id,
                name: materialName
              })}
            >
              <FaTimesCircleO />
            </span>
          </div>
        );
      });
      return (
        <div className={`col-sm-12 ${styles['materials-container']}`}>
          {materials.length ? materials : <p>No Materials added.</p>}
          <br />
          <div className={styles['float-right']}>
            <input
              type="button"
              className={styles['button-short']}
              value="ADD FILE"
              onClick={() => toggleAddMaterialModal({ flag: true, categoryId: category.id })}
            />
          </div>
        </div>
      );
    }
    return '';
  }

  renderCategory = category => (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className={`col-sm-6 ${styles['category-container']}`}>
            <div styleName="cursor-pointer" onClick={this.handleCaretToggle}>
              <div className="col-sm-10">
                <h3 className={styles['category-name']}>{category.name}</h3>
              </div>
              <div className={`col-sm-2 ${styles['caret-container']}`}>
                {this.renderCaret()}
              </div>
            </div>
            {this.renderMaterials(category)}
          </div>
          <div className="col-sm-2">
            <div
              className={styles['delete-category-icon']}
              onClick={() => this.deleteCategory(category)}
            >
              <FaTimesCircleO />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  render () {
    const { marketingMaterial: category } = this.props;
    return this.renderCategory(category);
  }
}
