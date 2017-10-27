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
import {
  // fetch
  fetchDentists,
  fetchDentistReviews,
  fetchStats,

  // setters
  setSelectedDentist,

  // search / sort dentists
  search,
  sort,

  // actions
  deleteDentistReview,
  fetchManagers,
  toggleTermsUpdate,
  termsUpdateRequest
} from 'containers/AdminDentistsPage/actions';
import {
  // fetch
  selectDentists,
  selectDentistReviews,
  selectStats,

  // getters
  selectSelectedDentist,

  // search / sort patients
  selectSearch,
  selectSort,
  selectProcessedDentists,
  selectManagers,
  termsUpdateModalOpenSelector,
  isUpdatingTermsSelector
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

    // getters
    selectedDentist: selectSelectedDentist(state),

    // search / sort patients
    currentSearchTerm: selectSearch(state),
    currentSortTerm: selectSort(state),
    processedDentists: selectProcessedDentists(state),
    managers: selectManagers(state),
    termsUpdateModalOpen: termsUpdateModalOpenSelector(state),
    isUpdatingTerms: isUpdatingTermsSelector(state),
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

    // setters
    setSelectedDentist: (dentist) => dispatch(setSelectedDentist(dentist)),

    // search / sort patients
    searchDentists: (name) => dispatch(search(name)),
    sortDentists: (status) => dispatch(sort(status)),

    // actions
    deleteDentistReview: (dentistId, reviewId) => dispatch(deleteDentistReview(dentistId, reviewId)),
    fetchManagers: () => dispatch(fetchManagers()),
    toggleTermsUpdate: flag => dispatch(toggleTermsUpdate(flag)),
    termsUpdateRequest: () => dispatch(termsUpdateRequest())
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
    dentistReviews: React.PropTypes.arrayOf(React.PropTypes.object),
    stats: React.PropTypes.object,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentists: React.PropTypes.func.isRequired,
    fetchDentistReviews: React.PropTypes.func.isRequired,
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

    // actions - dispatch
    deleteDentistReview: React.PropTypes.func.isRequired,
    toggleTermsUpdate: React.PropTypes.func.isRequired,
    termsUpdateRequest: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      searchTerm: this.props.currentSearchTerm !== null
                  ? this.props.currentSearchTerm
                  : '',
    };
  }

  componentWillMount () {
    if (this.props.user && (!this.props.dentists || !this.props.managers)) {
      this.props.fetchDentists();
      this.props.fetchStats();
      this.props.fetchManagers();
    }
  }

  componentDidMount () {
    this.props.changePageTitle('Dentists');
  }

  componentWillUnmount () {
    this.props.setSelectedDentist(null);
  }

  /*
  Events
  ------------------------------------------------------------
  */
  // select dentist
  onSelectDentist = (dentist) => {
    if (dentist !== null) {
      this.props.fetchDentistReviews(dentist.id);
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

  // remove review
  onRemoveReview = (dentist, review) => {
    this.props.deleteDentistReview(dentist.id, review.id);
  }

  /* Render Dentist Reviews
   * ------------------------------------------------------ */
  renderDentistReviews = (dentist) => {
    const {
      dentistReviews
    } = this.props;

    // precondition render: the data must be loaded, otherwise wait for it
    if (dentistReviews === null) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon={true} />
        </div>
      );
    }

    // precondition render: there are no reviews to display
    if (dentistReviews.length === 0) {
      return (
        <div className={styles['dentist-reviews']}>
          The dentist does not have any reviews yet.
        </div>
      );
    }

    return (
      <div className={styles['dentist-reviews']}>
        {dentistReviews.map((review) => {
          return this.renderDentistReview(dentist, review);
        })}
      </div>
    );
  }

  /* Render Dentist Review
   * ------------------------------------------------------ */
  renderDentistReview = (dentist, review) => {
    const {
      createdAt,
      message,
      client: { firstName, lastName },
      rating,
    } = review;

    return (
      <div className={"row " + styles['dentist-review']} key={review.id}>
        <div className="col-sm-3">
          <p>
            {moment(createdAt).format("M/D/YY")}
          </p>

          <p className={styles['dentist-review__score']}>
            {rating / 2} / 5
          </p>
        </div>

        <div className="col-sm-9">
          <p>
            {firstName} {lastName}
          </p>

          <p>
            {message}
          </p>

          <div>
            <input
              type="button"
              className={styles['button--short']}
              value="REMOVE"
              onClick={this.onRemoveReview.bind(this, dentist, review)}
            />
          </div>
        </div>
      </div>
    );
  }

  renderSortOptions = () => {
    const { currentSortTerm, managers } = this.props;
    return (
      <div className="col-sm-4" styleName="match-form-group-offset">
        <span>Sort By: </span>
        <select value={currentSortTerm} onChange={this.onSortSelect}>
          <option value="unassigned">Unassigned</option>
          {
            managers.map(manager => (
              <option key={manager.id} value={manager.id}>
                {manager.firstName} {manager.lastName}
              </option>
            ))
          }
        </select>
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
      dentistReviews,
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
        <AdminDashboardHeader
          stats={stats}
          termsUpdateModalOpen={this.props.termsUpdateModalOpen}
          isUpdatingTerms={this.props.isUpdatingTerms}
          toggleTermsUpdate={this.props.toggleTermsUpdate}
          termsUpdateRequest={this.props.termsUpdateRequest}
        />
        <AdminDashboardTabs active="reviews" />

        <div styleName="content">
          <div className="row">
            <div className="col-sm-offset-3 col-sm-3">

              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="SEARCH FOR DENTIST"
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

            {this.renderSortOptions()}

          </div>

          <DentistList
            dentists={processedDentists}
            selectedDentist={selectedDentist}

            selectDentist={this.onSelectDentist}
            renderListEntryBody={this.renderDentistReviews}
          />
        </div>

        {/* Modals
         * ------------------------------------------------------ */}
        {/* TODO */}

      </div>
    );
  }
}
