/*
Dentist Dashboard Header Component
================================================================================
TODO: Waiting on backend changes to implement some info fields.
      https://trello.com/c/uyJH3pNy/50-all-members-page

TODO: Displaying a mocked up PriceScore is blocked by missing icons in the
      PriceScore component.
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
// import PriceScore from 'components/PriceScore'; // TODO
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
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // passed in - actions
    onMemberSearch: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      memberSearchTerm: this.props.currentSearchTerm !== null
                          ? this.props.currentSearchTerm
                          : '',
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

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      dentistInfo,
      patients,
      user,
    } = this.props;

    const {
      memberSearchTerm,
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

    // TODO: Dentist users don't have a `metrics` field yet. [MOCKUP]
    // TODO: Dentist users don't have a `ratings` field yet. [MOCKUP]
    const {
      avatar,
      firstName,
      lastName,
//      metrics,
//      ratings,
//      state,
//      zipCode,
    } = user;

    const activeMemberCount = patients.reduce(
      (activeMemberCounter, patient) => {
        if (patient.subscription.status === "active") {
          // TODO: Members don't have their individual subscription info /
          //       membership fields, so they can't be investigated as active or
          //       not on an individual basis.  Once this is available, only
          //       add family members to the count if they are individually
          //       active.
          activeMemberCounter += 1 + patient.members.length; // patient + family members
        }

        return activeMemberCounter;
      },
      0
    );

    // TODO
    /*
    const {
      reviewScore,
      priceScore,
    } = ratings;
    */
    const reviewScore = 4.5;
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
    prevMonthRevenue = prevMonthRevenue.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
                  <ReviewScore score={reviewScore} />
                  {/* TODO, also horizontal bar separating the two scores */}
                  {/*<PriceScore score={priceScore} /> */}
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
                <Link styleName="quick-links__link" to="/dentist/edit-office">Edit Office Info</Link>
              </li>
              <li>
                <Link styleName="quick-links__link" to="/dentist/add-member">Add New Member</Link>
              </li>
              <li>
                <Link styleName="quick-links__link" to="/dentist/custom-membership">Custom Membership</Link>
              </li>
              <li>
                <Link styleName="quick-links__link" to="/dentist/reports">Reports</Link>
              </li>
              <li>
                <Link styleName="quick-links__link" to="/dentist/marketing">Marketing Materials</Link>
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
                Current Membership Fees and Activation Fees
              </h2>
              <p styleName="metrics__entry">
                Total Active Members:
                {' '}
                <strong styleName="metrics__value">{activeMemberCount}</strong>
              </p>
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
            </div>
          </div>

          {/*
          Member Search
          ------------------------------------------------------------
          */}
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

        {/* End Row / Header Section */}
        </div>

      {/* End Wrapper Div */}
      </div>
    );
  }

};

export default DentistDashboardHeader;
