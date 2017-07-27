/*
Dentist Dashboard Header Component
================================================================================
TODO: Waiting on backend changes to implement some info fields.
      https://trello.com/c/uyJH3pNy/50-all-members-page

        - need `revewScore`, `priceScore`, and metrics
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import CSSModules from 'react-css-modules';
import FaSearch from 'react-icons/lib/fa/search';
import { Link } from 'react-router';

// app
import Avatar from 'components/Avatar';
import DentistReportsModal from 'components/DentistReportsModal';
import PriceScore from 'components/PriceScore';
import ReviewScore from 'components/ReviewScore';

// local
import styles from './styles.css';


/*
Dentist Dashboard Header
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
class DentistDashboardHeader extends React.Component {

  static propTypes = {
    // passed in - data
    currentSearchTerm: React.PropTypes.string,
    dentistInfo: React.PropTypes.object,
    patients: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    reports: React.PropTypes.arrayOf(React.PropTypes.object),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // passed in - actions
    onMemberSearch: React.PropTypes.func,
    onReportSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      memberSearchTerm: this.props.currentSearchTerm !== null
        ? this.props.currentSearchTerm
        : '',
      showReportsModal: false,
    };
  }

  /*
  Component Actions
  ------------------------------------------------------------
  */
  onMemberSearch = () => {
    this.props.onMemberSearch(this.state.memberSearchTerm);
  }

  updateMemberSearchTerm = (evt) => {
    this.setState({
      ...this.state,
      memberSearchTerm: evt.target.value,
    })
  }

  toggleReportsModal = () => {
    this.setState({
      ...this.state,
      showReportsModal: !this.state.showReportsModal,
    });
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      dentistInfo,
      patients,
      reports,
      user,

      onReportSelected,
    } = this.props;

    const {
      memberSearchTerm,
      showReportsModal,
    } = this.state;

    const {
      email,
      phone,

      officeName,
      address,
      city,
      state,
      zipCode,
    } = dentistInfo;

    const {
      avatar,
      firstName,
      id,
      lastName,
      //      metrics, // TODO: backend needs to provide this
      //      priceScore, // TODO: backend needs to provide this
      rating,
    } = user;

    let activeMemberCount = 0;
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      if (patient && patient.status === 'active') {
        activeMemberCount++;
      }
    }

    // TODO
    const priceScore = 4.0;

    // TODO
    /*
    let {
      prevMonthRevenue,
      lifetimeRevenue,
    } = metrics;
    */
    let prevMonthRevenue = 9781.50;
    let lifetimeRevenue = 197810.01;

    // Shoutout to the internet!  How to convert an number into a USD string:
    // http://stackoverflow.com/a/14428340
    prevMonthRevenue = prevMonthRevenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    prevMonthRevenue = prevMonthRevenue.substr(0, prevMonthRevenue.length - 3); // remove the cents
    lifetimeRevenue = lifetimeRevenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    lifetimeRevenue = lifetimeRevenue.substr(0, lifetimeRevenue.length - 3); // remove the cents

    return (
      <div styleName="dentist-dashboard-header">

        <div className="row" styleName="dentist-dashboard-header__section">
          {/*
          Dentist Info
          ------------------------------------------------------------
          */}
          <div className="col-sm-9">
            <div className="row dentist">

              <div className="col-sm-3">
                <Avatar url={avatar} size={'100%'} />
              </div>

              <div className="col-sm-9">
                <h2 styleName="dentist__name">{firstName} {lastName}</h2>

                <div styleName="dentist__scores">
                  <ReviewScore score={user.rating} />
                  {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
                  {/*
                  <PriceScore score={priceScore} />
                  */}
                </div>

                <p styleName="dentist__address">
                  {officeName}
                  <br />
                  {address}
                  <br />
                  {city}, {state} {zipCode}
                </p>

                <p styleName="dentist__contact">
                  {phone}
                  <br />
                  {email}
                </p>
              </div>

            </div>
          </div>

          {/*
          Quick Links
          ------------------------------------------------------------
          */}
          <div className="col-sm-3">
            <ul styleName="quick-links">
              <li>
                <Link styleName="quick-links__link" to="/dentist/edit-profile">
                  Edit Office Info
                </Link>
              </li>
              <li>
                <Link styleName="quick-links__link" to={`/accounts/signup/my-dentist/${id}`}>
                  Add New Member
                </Link>
              </li>
              <li>
                <Link styleName="quick-links__link" to="#">
                  Custom Membership
                </Link>
              </li>
              <li>
                <span styleName="quick-links__link" onClick={this.toggleReportsModal}>
                  Reports
                </span>
              </li>
              <li>
                <Link styleName="quick-links__link" to="#">
                  Marketing Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* End Row / Header Section */}
        </div>

        <div className="row" styleName="dentist-dashboard-header__section">
          {/*
          Metrics
          ------------------------------------------------------------
          */}
          <div className="col-sm-9">
            <div styleName="metrics">
              <h2 styleName="metrics__title">
                Current Membership Fees
              </h2>
              <p styleName="metrics__entry">
                Total Active Members:
                {' '}
                <strong styleName="metrics__value">{activeMemberCount}</strong>
              </p>
              {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
              {/*
              <p styleName="metrics__entry">
                Total Prior Month Revenue:
                {' '}
                <strong styleName="metrics__value">${prevMonthRevenue}</strong>
              </p>
              <p styleName="metrics__entry">
                Total revenue generation to date:
                {' '}
                <strong styleName="metrics__value">${lifetimeRevenue}</strong>
              </p>
              */}
            </div>
          </div>

          {/*
          Member Search
          ------------------------------------------------------------
          */}
          {this.props.onMemberSearch && (
            <div className="col-sm-3" styleName="search-col">
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="SEARCH FOR MEMBER"
                    className="form-control--large"
                    value={memberSearchTerm}
                    onChange={this.updateMemberSearchTerm}
                  />
                  <InputGroup.Button onClick={this.onMemberSearch}>
                    <span className="btn btn-default">
                      <FaSearch />
                    </span>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </div>
          )}

          {/* End Row / Header Section */}
        </div>

        {/*
        Modals
        ------------------------------------------------------
        */}
        <DentistReportsModal
          show={showReportsModal}
          onHide={this.toggleReportsModal}

          reports={reports}
          onReportSelected={onReportSelected}
        />

        {/* End Wrapper Div */}
      </div>
    );
  }

};

export default DentistDashboardHeader;
