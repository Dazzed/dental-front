/*
Admin Dashboard Header Component
================================================================================
TODO: Implement other admin pages then add the link routes here.
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

// local
import styles from './styles.css';
import TermsUpdateModal from './components/termsUpdateModal';

/*
Admin Dashboard Header
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
export default class AdminDashboardHeader extends React.Component {

  static propTypes = {
    stats: React.PropTypes.object,
    toggleTermsUpdate: React.PropTypes.func.isRequired
  }

  handleTermsUpdateClick = evt => {
    evt.preventDefault();
    this.props.toggleTermsUpdate(true);
  }

  renderTermsUpdateModal = () => {
    const {
      termsUpdateModalOpen,
      isUpdatingTerms,
      toggleTermsUpdate,
      termsUpdateRequest
    } = this.props;
    if (termsUpdateModalOpen) {
      return (
        <TermsUpdateModal
          isUpdatingTerms={isUpdatingTerms}
          toggleTermsUpdate={toggleTermsUpdate}
          termsUpdateRequest={termsUpdateRequest}
        />
      );
    }
    return null;
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      stats,
    } = this.props;

    return (
      <div className="row">
        {/*
        Metrics
        ------------------------------------------------------------
        */}
        <div className="col-sm-9">
          {stats && (
            <div styleName="metrics">
              <p styleName="metrics__entry">
                Total Dentist Offices:
                {' '}
                <strong styleName="metrics__value">{stats.dentistOfficeCount}</strong>
              </p>
              <p styleName="metrics__entry">
                Total Active Members:
                {' '}
                <strong styleName="metrics__value">{stats.activeUserCount}</strong>
              </p>
            </div>
          )}
        </div>

        {/*
        Quick Links
        ------------------------------------------------------------
        TODO
        */}
        <div className="col-sm-3">
          <ul styleName="quick-links">
            <li>
              <Link styleName="quick-links__link" to="/admin/manage">
                Account Managers
              </Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/admin/services">
                Services
              </Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/admin/marketing_materials">
                Marketing Materials
              </Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="/admin/reports">
                Reports
              </Link>
            </li>
            <li>
              <Link styleName="quick-links__link" to="#">
                Security Settings
              </Link>
            </li>
            <li>
              <a styleName="quick-links__link" href="#" onClick={this.handleTermsUpdateClick}>
                Update Terms and Conditions
              </a>
            </li>
          </ul>
        </div>
        {this.renderTermsUpdateModal()}
      {/* End Wrapper */}
      </div>
    );
  }

}
