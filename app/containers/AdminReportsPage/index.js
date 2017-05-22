/*
Admin Reports Page
================================================================================
Route: `/admin/reports`
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
import AdminDashboardHeader from 'components/AdminDashboardHeader';
import DentistList from 'components/DentistsList';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentists,
  fetchDentistReports,
  fetchStats,

  // setters
  setSelectedDentist,

  // search / sort dentists
  search,
  sort,

  // download report
  downloadReport,
} from 'containers/AdminDentistsPage/actions';
import {
  // fetch
  selectDentists,
  selectDentistReports,
  selectStats,

  // getters
  selectSelectedDentist,

  // search / sort patients
  selectSearch,
  selectSort,
  selectProcessedDentists,
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
    dentistReports: selectDentistReports(state),
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
    fetchDentistReports: (dentistId) => dispatch(fetchDentistReports(dentistId)),
    fetchStats: () => dispatch(fetchStats()),

    // setters
    setSelectedDentist: (dentist) => dispatch(setSelectedDentist(dentist)),

    // search / sort patients
    searchDentists: (name) => dispatch(search(name)),
    sortDentists: (status) => dispatch(sort(status)),

    // download report
    downloadReport: (reportName, reportUrl) => downloadReport(reportName, reportUrl),
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
    dentistReports: React.PropTypes.arrayOf(React.PropTypes.object),
    stats: React.PropTypes.object,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentists: React.PropTypes.func.isRequired,
    fetchDentistReports: React.PropTypes.func.isRequired,
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

    // download report - dispatch
    downloadReport: React.PropTypes.func.isRequired,
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
      this.props.fetchDentistReports(dentist.id);
    }

    this.props.setSelectedDentist(dentist);
  }

  // search & sort
  onSearchEntered = (evt) => {
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

  // download report
  onDentistReportLinkClick = ({month, year, url}) => {
    const {
      selectedDentist: { firstName, lastName },
    } = this.props;

    const reportName = `dentist_${lastName}_${firstName}_{year}_{month}.pdf`;
    this.props.downloadReport(reportName, url);
  }

  /* Render Dentist Reports
   * ------------------------------------------------------ */
  renderDentistReports = () => {
    const {
      dentistReports
    } = this.props;

    // precondition render: the data must be loaded, otherwise wait for it
    if (dentistReports === null) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon={true} />
        </div>
      );
    }

    // precondition render: there are no reports to display
    if (dentistReports.length === 0) {
      return (
        <div className={styles['dentist-reports']}>
          The dentist does not have any reports yet.
        </div>
      );
    }

    return (
      <div>TODO</div>
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
      reports,
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
          <h1 styleName="large-title">Reports</h1>

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
          <h1 styleName="large-title">Reports</h1>

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
        <h1 styleName="large-title">Reports</h1>

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
            renderListEntryBody={this.renderDentistReports}
          />
        </div>

        {/* Modals
         * ------------------------------------------------------ */}
        {/* TODO */}

      </div>
    );
  }
}
