/* Dentists List Entry Component
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
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// local
import styles from './list-entry.css';


/* Dentists List Entry
 * ========================================================================== */
@CSSModules(styles, { allowMultiple: true })
export default class DentistsListEntry extends React.Component {

  static propTypes = {
    // passed in - data
    dentist: React.PropTypes.object.isRequired,
    position: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool,

    // passed in - event handlers
    selectDentist: React.PropTypes.func.isRequired,

    // passed in - renderers
    renderListEntryBody: React.PropTypes.func.isRequired,
  }

  /* Event Handlers
   * ------------------------------------------------------ */
  onSelectDentist = () => {
    const {
      dentist,
      selected,

      selectDentist,
    } = this.props;

    // precondition: if the dentist is already selected, then unselected them
    if (selected) {
      selectDentist(null);
      return;
    }

    selectDentist(dentist);
  }

  

  renderFullName = (listNum, dentist) => {
    let tooltip = '';
    if (dentist.verified) {
      if (!dentist.dentistInfo.managerId) {
        tooltip = <Tooltip id="tooltip"><strong>Dentist is not assigned an account manager.</strong></Tooltip>;
        return (
          <OverlayTrigger placement="top" overlay={tooltip}>
            <span styleName={'list-entry__title list-entry__title_red'}>
              {listNum}) {dentist.firstName} {dentist.lastName}
            </span>
          </OverlayTrigger>
        );
      } else {
        return (
          <span styleName={'list-entry__title'}>
            {listNum}) {dentist.firstName} {dentist.lastName}
          </span>
        );
      }
    }
    if (dentist.dentistInfo.managerId) {
      tooltip = <Tooltip id="tooltip"><strong>Dentist is not activated.</strong></Tooltip>;
    } else {
      tooltip = (
        <Tooltip id="tooltip">
          <strong>Dentist is not activated and not assigned an account manager.</strong>
        </Tooltip>
      );
    }
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <span styleName={'list-entry__title list-entry__title_red'}>
          {listNum}) {dentist.firstName} {dentist.lastName}
        </span>
      </OverlayTrigger>
    );
  }
  /* Render
   * ------------------------------------------------------ */
  render () {
    const {
      dentist,
      position,
      selected,

      renderListEntryBody,
    } = this.props;

    const listNum = ("00" + dentist.id.toString()).substr(-3, 3); // guarantee a length 3 listNum

    return (
      <div className="row" styleName="list-entry__wrapper">
        <div className="col-sm-12">
          <div styleName="list-entry">

            <div styleName="list-entry__header" onClick={this.onSelectDentist}>
              {this.renderFullName(listNum, dentist)}

              <span styleName="list-entry__toggle">
                {selected ? (<CaretDown />) : (<CaretRight />)}
              </span>
            </div>

            {selected && (
              <div styleName="list-entry__body">
                <div className="row">
                  <div className="col-sm-offset-1 col-sm-10">
                    {renderListEntryBody(dentist)}
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