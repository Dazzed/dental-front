/* Dentists List Component
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


/* Dentists List
 * ========================================================================== */
@CSSModules(styles, { allowMultiple: true })
export default class DentistsList extends React.Component {

  static propTypes = {
    // passed in - data
    dentists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedDentist: React.PropTypes.object,

    // passed in - event handlers
    selectDentist: React.PropTypes.func.isRequired,

    // padded in- renderers
    renderListEntryBody: React.PropTypes.func.isRequired,
  }

  /* Render
   * ------------------------------------------------------ */
  render() {
    const {
      children,

      dentists,
      selectedDentist,

      selectDentist,
      renderListEntryBody,
    } = this.props;

    return (
      <div styleName="dentist-list">

        {dentists.map((dentist, index) => (
          <ListEntry
            key={dentist.id}
            dentist={dentist}
            position={index + 1}
            selected={dentist.id === (selectedDentist ? selectedDentist.id : null)}

            selectDentist={selectDentist}
            renderListEntryBody={renderListEntryBody}
          />
        ))}

      </div>
    );
  }

}