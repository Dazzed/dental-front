/*
Admin Dentists Page
================================================================================
Route: `/admin/dentists`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import FaSearch from 'react-icons/lib/fa/search';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import AdminDashboardHeader from 'components/AdminDashboardHeader';
import AdminDashboardTabs from 'components/AdminDashboardTabs';
import DentistList from 'components/DentistsList';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  // fetch
  fetchDentists,
  fetchDentistDetails,
  fetchStats,

  // setters
  setSelectedDentist,

  // search / sort dentists
  search,
  sort,
} from './actions';
import {
  // fetch
  selectDentists,
  selectDentistDetails,
  selectStats,

  // getters
  selectSelectedDentist,

  // search / sort patients
  selectSearch,
  selectSort,
  selectProcessedDentists,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dentists: selectDentists(state),
    dentistDetails: selectDentistDetails(state),
    stats: selectStats(state),
    user: selectCurrentUser(state),

    // getters
    selectedDentist: selectSelectedDentist(state),

    // search / sort patients
    currentSearchTerm: selectSearch(state),
    currentSortTerm: selectSort(state),
    processedDentists: selectProcessedDentists(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app 
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    
    // fetch
    fetchDentists: () => dispatch(fetchDentists()),
    fetchDentistDetails: (dentistId) => dispatch(fetchDentistDetails(dentistId)),
    fetchStats: () => dispatch(fetchStats()),

    // setters
    setSelectedDentist: (dentist) => dispatch(setSelectedDentist(dentist)),

    // search / sort
    searchDentists: (name) => dispatch(search(name)),
    sortDentists: (status) => dispatch(sort(status)),
  };
}


/*
Admin Dentists
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class AdminDentistsPage extends React.Component {

  static propTypes = {
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dentists: React.PropTypes.arrayOf(React.PropTypes.object),
    dentistDetails: React.PropTypes.object,
    stats: React.PropTypes.object,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentists: React.PropTypes.func.isRequired,
    fetchDentistDetails: React.PropTypes.func.isRequired,
    fetchStats: React.PropTypes.func.isRequired,

    // getters - state
    selectedDentist: React.PropTypes.object,

    // setters - dispatch
    setSelectedDentist: React.PropTypes.func.isRequired,

    // search / sort - state
    currentSearchTerm: React.PropTypes.string,
    currentSortTerm: React.PropTypes.string,
    processedDentists: React.PropTypes.arrayOf(React.PropTypes.object),

    // search / sort - dispatch
    searchDentists: React.PropTypes.func.isRequired,
    sortDentists: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      searchTerm: this.props.currentSearchTerm !== null
                  ? this.props.currentSearchTerm
                  : '',
    };
  }

  componentWillMount() {
    this.props.fetchDentists();
    this.props.fetchStats();
  }

  componentDidMount() {
    this.props.changePageTitle('Dentists');
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // select dentist
  onSelectDentist = (dentist) => {
    if (dentist !== null) {
      this.props.fetchDentistDetails(dentist.id);
    }

    this.props.setSelectedDentist(dentist);
  }

  // search & sort
  onSearchEntered = () => {
    this.props.searchDentists(this.state.searchTerm);
  }

  onSortSelect = (evt) => {
    this.props.sortDentists(evt.target.value);
  }

  updateSearchTerm = (evt) => {
    this.setState({
      ...this.state,
      searchTerm: evt.target.value,
    });
  }

  // edit dentist
  onEditDentist = () => {
    alert('todo: edit');
  }

  /* Render Dentist Details
   * ------------------------------------------------------ */
  renderDentistDetails = (dentist) => {
    const {
      dentistDetails
    } = this.props;

    // precondition render: the data must be loaded, otherwise wait for it
    if (dentistDetails === null) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon={true} />
        </div>
      );
    }

    const {
      createdAt,
    } = dentistDetails;

    const {
      address,
      city,
      state,
      zipCode,

      email,
      phone,

      activeMemberCount,
      marketplaceOptIn,

      priceCodes,
      membership: { discount }
    } = dentistDetails.dentistInfo;

    const activeSince = moment(createdAt).format("MMMM Do, YYYY");

    return (
      <div className={'row ' + styles['dentist-details']}>
        <div className="col-md-6">
          <p>
            <span className={styles['dentist-details__value']}>
              {address}
              <br />
              {city}, {state} {zipCode}
            </span>
          </p>

          <p>
            Contact:
            {' '}
            <span className={styles['dentist-details__value']}>
              {email}
              <br />
              {phone}
            </span>
          </p>

          <p>
            Total Active Members:
            {' '}
            <span className={styles['dentist-details__value']}>
              {activeMemberCount}
            </span>
          </p>

          <p>
            Active Since:
            {' '}
            <span className={styles['dentist-details__value']}>
              {activeSince}
            </span>
          </p>

          {/* TODO: enable */}
          {/*
          <p>
            Account Manager:
            {' '}
            <span className={styles['dentist-details__value']}>
              TODO
            </span>
          </p>
          */}

          {/* TODO: enable */}
          {/*
          <p>
            Office Link:
            {' '}
            <span className={styles['dentist-details__value']}>
              TODO
            </span>
          </p>
          */}

          <p>
            Marketplace:
            {' '}
            <span className={styles['dentist-details__value']}>
              {marketplaceOptIn ? 'Active' : 'Inactive'}
            </span>
          </p>

          {/* TODO: enable */}
          {/*
          <p>
            Affordability Index:
            {' '}
            <span className={styles['dentist-details__value']}>
              TODO
            </span>
          </p>
          */}
        </div>

        <div className="col-md-6">
          <p className={styles['dentist-details__section-title']}>
            Dental Code Fees:
          </p>

          {priceCodes.map(({ code, price }) => {
            return (
              <div key={code} className={'row ' + styles['dentist-details__price-code']}>
                <div className="col-md-3 text-right">
                  {code}:
                </div>

                <div className="col-md-3" className={styles['dentist-details__value']}>
                  ${parseFloat(price).toFixed(2)}
                </div>
              </div>
            );
          })}

          <p>
            Discount:
            {' '}
            <span className={styles['dentist-details__value']}>
              {discount}%
            </span>
          </p>

          <p className="text-right">
            <input
              type="button"
              className={styles['button--short']}
              value="EDIT"
              onClick={this.onEditDentist.bind(this, dentist)}
            />
          </p>
        </div>
      </div>
    );
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentists,
      dentistDetails,
      stats,
      user,

      // getters & setters
      selectedDentist,

      // search / sort dentists
      currentSortTerm,
      processedDentists,
    } = this.props;

    const {
      // search / sort dentists
      searchTerm,
    } = this.state;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (dentists === null) {
      return (
        <div>
          <AdminDashboardTabs active="dentists" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    // precondition: there are no dentists to list
    if (dentists.length === 0) {
      return (
        <div>
          <AdminDashboardHeader stats={stats} />
          <AdminDashboardTabs active="dentists" />

          <div styleName="content content--filler">
            <p>
              No dentists were loaded.  Your intenet may be down, or at least very slow.  The alternative is that there are no dentists that have signed up. 
            </p>
          </div>
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div>
        <AdminDashboardHeader stats={stats} />
        <AdminDashboardTabs active="dentists" />

        <div styleName="content">
          <div className="row">
            <div className="col-sm-offset-3 col-sm-3">

              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="SEARCH FOR MEMBER"
                    className="form-control--large"
                    value={searchTerm}
                    onChange={this.updateSearchTerm}
                  />
                  <InputGroup.Button onClick={this.onSearchEntered}>
                    <span className="btn btn-default">
                      <FaSearch />
                    </span>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>

            </div>

            <div className="col-sm-3" styleName="match-form-group-offset">
              <span>Sort By: </span>
              <select value={currentSortTerm} onChange={this.onSortSelect}>
                <option value="date">Date Joined</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
              </select>
            </div>

          </div>

          <DentistList
            dentists={processedDentists}
            selectedDentist={selectedDentist}

            selectDentist={this.onSelectDentist}
            renderListEntryBody={this.renderDentistDetails}
          />
        </div>

        {/* Modals
         * ------------------------------------------------------ */}
        {/* TODO */}

      </div>
    );
  }
}
