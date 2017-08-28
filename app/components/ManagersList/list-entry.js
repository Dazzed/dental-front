/* Managers List Entry Component
 * ==========================================================================
 */

/* Imports
 * ------------------------------------------------------ */
// lib
import moment from 'moment';
import React from 'react';
import CSSModules from 'react-css-modules';
import CaretDown from 'react-icons/lib/fa/caret-down';
import CaretRight from 'react-icons/lib/fa/caret-right';

// local
import styles from './list-entry.css';


/* Dentists List Entry
 * ========================================================================== */
@CSSModules(styles, { allowMultiple: true })
export default class DentistsListEntry extends React.Component {

  static propTypes = {
    // passed in - data
    manager: React.PropTypes.object.isRequired,
    position: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool,

    // passed in - event handlers
    selectManager: React.PropTypes.func.isRequired,
    onEditButtonClick: React.PropTypes.func.isRequired,
  }

  /* Event Handlers
   * ------------------------------------------------------ */
  onSelectManager = () => {
    const {
      manager,
      selected,

      selectManager,
    } = this.props;

    // precondition: if the manager is already selected, then unselected them
    if (selected) {
      selectManager(null);
      return;
    }

    selectManager(manager);
  }

  /* Render
   * ------------------------------------------------------ */
  render() {
    const {
      manager,
      position,
      selected,
      onEditButtonClick,
    } = this.props;

    const listNum = ("00" + position.toString()).substr(-3, 3); // guarantee a length 3 listNum

    return (
      <div className="row" styleName="list-entry__wrapper">
        <div className="col-sm-12">
          <div styleName="list-entry">

            <div styleName="list-entry__header" onClick={this.onSelectManager}>
              <span styleName="list-entry__title">
                {listNum}) {manager.firstName} {manager.lastName}
              </span>

              <span styleName="list-entry__toggle">
                {selected ? (<CaretDown />) : (<CaretRight />)}
              </span>
            </div>

            {selected && (
              <div styleName="list-entry__body">
                <div className={'row ' + styles['manager-details']}>
                  <div className='col-md-12'>
                    <span className={styles['manager-details__value']}>
                      <p>Email: {manager.email}</p>
                    </span>
                  </div>

                  <div className='col-md-12'>
                    <span className={styles['manager-details__value']}>
                      <p>Phone: {manager.phoneNumbers[0].number}</p>
                    </span>
                  </div>

                  <div className='col-md-12'>
                    <input
                      type="button"
                      className={styles['button--short']}
                      value="EDIT"
                      onClick={() => onEditButtonClick(manager)}
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

}