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
import AdminEditDentistFormModal from 'components/AdminEditDentistFormModal';
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
  setEditingDentistId,

  // search / sort dentists
  search,
  sort,

  // actions
  editDentist,
  fetchManagers,
} from './actions';
import {
  // fetch
  selectDentists,
  selectDentistDetails,
  selectStats,

  // getters
  selectSelectedDentist,
  selectEditingDentistId,

  // search / sort patients
  selectSearch,
  selectSort,
  selectProcessedDentists,
  selectManagers,
} from './selectors';
import styles from './styles.css';
import DentistDetails from './components/DentistDetails';

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
    editingDentistId: selectEditingDentistId(state),
    // search / sort patients
    currentSearchTerm: selectSearch(state),
    currentSortTerm: selectSort(state),
    processedDentists: selectProcessedDentists(state),
    managers: selectManagers(state),
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
    setEditingDentistId: dentistId => dispatch(setEditingDentistId(dentistId)),
    // search / sort
    searchDentists: (name) => dispatch(search(name)),
    sortDentists: (status) => dispatch(sort(status)),

    // actions
    editDentist: (selectedDentist, values) => dispatch(editDentist(selectedDentist, values)),
    resetEditDentistForm: () => dispatch(resetForm('adminEditDentist')),
    fetchManagers: () => dispatch(fetchManagers()),
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
    setEditingDentistId: React.PropTypes.func.isRequired,
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
    editDentist: React.PropTypes.func.isRequired,
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
    if (this.props.user && (!this.props.dentists || this.props.managers)) {
      this.props.fetchDentists();
      this.props.fetchStats();
      this.props.fetchManagers();
    }
  }

  componentDidMount() {
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
    // if (dentist !== null) {
    //   this.props.fetchDentistDetails(dentist.id);
    // }

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
      searchTerm: evt.target.value,
    });
  }

  // edit dentist
  onEditDentist = () => {
    this.props.resetEditDentistForm();
    const { selectedDentist } = this.props;
    this.props.setEditingDentistId(selectedDentist.id);
  }

  onEditDentistCancel = () => {
    this.props.setEditingDentistId(null);
  }

  onEditDentistSubmit = (values) => {
    values = {
      ...values,
      links: this.props.selectedDentist.links,
      alteredLinks: values.links.map(l => ({ id: l.value })),
    };
    this.props.editDentist(this.props.selectedDentist, values);
  }

  /* Render Dentist Details
   * ------------------------------------------------------ */
  renderDentistDetails = (dentist) => {
    const {
      selectedDentist
    } = this.props;

    // precondition render: the data must be loaded, otherwise wait for it
    if (!selectedDentist) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon />
        </div>
      );
    }

    return (
      <DentistDetails
        selectedDentist={selectedDentist}
        onEditDentist={() => this.onEditDentist.call(this, selectedDentist)}
      />
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
      managers,
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

            <div className="col-sm-4" styleName="match-form-group-offset">
              <span>Sort By: </span>
              <select value={currentSortTerm} onChange={this.onSortSelect}>
                <option value="date">Date Joined</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
                <option value="activated">Account Manager/Non Activated</option>
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
        { selectedDentist && this.props.editingDentistId === selectedDentist.id &&
          <AdminEditDentistFormModal
            show
            onCancel={this.onEditDentistCancel}

            initialValues={selectedDentist}
            onSubmit={this.onEditDentistSubmit}
            managers={managers}
          />
        }
      </div>
    );
  }
}
