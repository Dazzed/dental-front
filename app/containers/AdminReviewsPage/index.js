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
import Avatar from 'components/Avatar';
import CheckoutFormModal from 'components/CheckoutFormModal';
import AdminDashboardHeader from 'components/AdminDashboardHeader';
import AdminDashboardTabs from 'components/AdminDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentists,
  fetchDentistReviews,
  fetchStats,

  // search / sort dentists
  search,
  sort,
} from 'containers/AdminDentistsPage/actions';
import {
  // fetch
  selectDentists,
  selectDentistReviews,
  selectStats,

  // search / sort patients
  selectSearch,
  selectSort,
} from 'containers/AdminDentistsPage/selectors';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dentists: selectDentists(state),
    dentistReviews: selectDentistReviews(state),
    stats: selectStats(state),
    user: selectCurrentUser(state),

    // search / sort patients
    currentSearchTerm: selectSearch(state),
    currentSortTerm: selectSort(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app 
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    
    // fetch
    fetchDentists: () => dispatch(fetchDentists()),
    fetchDentistReviews: (dentistId) => dispatch(fetchDentistReviews(dentistId)),
    fetchStats: () => dispatch(fetchStats()),

    // search / sort patients
    searchDentists: (name) => dispatch(searchDentists(name)),
    sortDentists: (status) => dispatch(sortDentists(status)),
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
    dentistReviews: React.PropTypes.object,
    stats: React.PropTypes.object,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentists: React.PropTypes.func.isRequired,
    fetchDentistReviews: React.PropTypes.func.isRequired,
    fetchStats: React.PropTypes.func.isRequired,

    // search / sort patients - state
    currentSearchTerm: React.PropTypes.string,
    currentSortTerm: React.PropTypes.string,

    // search / sort patients - dispatch
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
  Page Actions
  ------------------------------------------------------------
  */
  // TODO

  /*
  Events
  ------------------------------------------------------------
  */
  // TODO

  // search & sort
  onSearchEntered = (evt) => {
    this.props.searchDentists(evt.target.value);
  }

  onSortSelect = (evt) => {
    this.props.sortMembers(evt.target.value);
  }

  updateSearchTerm = (evt) => {
    this.setState({
      ...this.state,
      searchTerm: evt.target.value,
    });
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentists,
      dentistReviews,
      stats,
      user,

      // search / sort dentists
      currentSortTerm,
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
          <AdminDashboardTabs active="reviews" />

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
          <AdminDashboardTabs active="reviews" />

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
        <AdminDashboardTabs active="reviews" />

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
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
              </select>
            </div>

          </div>

          DENTIST LIST GOES HERE
        </div>

        {/* Modals
         * ------------------------------------------------------ */}
        {/* TODO */}

      </div>
    );
  }
}
