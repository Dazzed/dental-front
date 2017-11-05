/*
Admin Dashboard Header Component
================================================================================
*/
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleSecurityForm,
  securityFormSubmitRequest
} from 'containers/AdminDentistsPage/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import styles from './styles.css';
import TermsUpdateModal from './components/termsUpdateModal';
import AccountSecurityFormModal from './components/AccountSecurityFormModal';

function mapStateToProps (state) {
  const {
    securityFormModalOpen,
    isUpdatingSecuritySettings
  } = state.adminDentistsPage;
  return {
    securityFormModalOpen,
    isUpdatingSecuritySettings,
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    toggleSecurityForm,
    securityFormSubmitRequest
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class AdminDashboardHeader extends React.Component {

  static propTypes = {
    stats: PropTypes.object,
    toggleTermsUpdate: PropTypes.func.isRequired,
    securityFormModalOpen: PropTypes.bool.isRequired,
    isUpdatingSecuritySettings: PropTypes.bool.isRequired,

    toggleSecurityForm: PropTypes.func.isRequired,
    securityFormSubmitRequest: PropTypes.func.isRequired
  }

  handleTermsUpdateClick = evt => {
    evt.preventDefault();
    this.props.toggleTermsUpdate(true);
  }

  handleSecuritySettingsClick = evt => {
    evt.preventDefault();
    this.props.toggleSecurityForm(true);
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

  renderSecurityFormModal = () => {
    const {
      securityFormModalOpen,
      isUpdatingSecuritySettings,
    } = this.props;
    const onCancel = () => {
      if (isUpdatingSecuritySettings) {
        return false;
      }
      this.props.toggleSecurityForm(false);
    };
    const onSubmit = (values) => {
      if (isUpdatingSecuritySettings) {
        return false;
      }
      this.props.securityFormSubmitRequest(
        {
          ...values,
          email: this.props.user.email
        }
      );
    };
    if (securityFormModalOpen) {
      return (
        <AccountSecurityFormModal
          show
          onCancel={onCancel}
          onSubmit={onSubmit}
          isUpdatingSecuritySettings={isUpdatingSecuritySettings}
        />
      );
    }
    return null;
  }

  render () {
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
        <div className="col-sm-3">
          <ul styleName="quick-links">
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
              <Link styleName="quick-links__link" to="#" onClick={this.handleSecuritySettingsClick}>
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
        {this.renderSecurityFormModal()}
      </div>
    );
  }
}
