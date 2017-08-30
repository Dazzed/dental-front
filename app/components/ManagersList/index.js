/* Managers List Component
 * ==========================================================================
 */

/* Imports
 * ------------------------------------------------------ */
// lib
import moment from 'moment';
import React from 'react';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';

// local
import ListEntry from './list-entry.js';
import styles from './styles.css';


/* Managers List
 * ========================================================================== */
@CSSModules(styles, { allowMultiple: true })
export default class DentistsList extends React.Component {

  static propTypes = {
    // passed in - data
    managers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedManager: React.PropTypes.object,

    // passed in - event handlers
    selectManager: React.PropTypes.func.isRequired,
    onEditButtonClick: React.PropTypes.func.isRequired,

  }

  /* Render
   * ------------------------------------------------------ */
  render() {
    const {
      managers,
      selectManager,
      selectedManager,
      onEditButtonClick,
    } = this.props;

    return (
      <div styleName="manager-list">

        {managers.map((manager, index) => (
          <ListEntry
            key={manager.id}
            manager={manager}
            position={index + 1}
            selected={manager.id === (selectedManager ? selectedManager.id : null)}
            selectManager={selectManager}
            onEditButtonClick={onEditButtonClick}
          />
        ))}

      </div>
    );
  }

}
