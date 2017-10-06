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
import AdminDashboardHeader from 'components/AdminDashboardHeader';
import AdminDashboardTabs from 'components/AdminDashboardTabs';
import DentistList from 'components/DentistsList';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // fetch
  fetchDentists,
  fetchDentistMembers,
  fetchStats,

  // setters
  setSelectedDentist,

  // search / sort dentists
  search,
  sort,
  toggleRefundingMember,
  initiateRefundingMember,
} from 'containers/AdminDentistsPage/actions';
import {
  // fetch
  selectDentists,
  selectDentistMembers,
  selectStats,

  // getters
  selectSelectedDentist,

  // search / sort patients
  selectSearch,
  selectSort,
  selectProcessedDentists,
  selectRefundingMember,
} from 'containers/AdminDentistsPage/selectors';

// local
import styles from './styles.css';

import RefundMemberForm from './modals/refund';
/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // fetch
    dentists: selectDentists(state),
    dentistMembers: selectDentistMembers(state),
    stats: selectStats(state),
    user: selectCurrentUser(state),

    // getters
    selectedDentist: selectSelectedDentist(state),

    // search / sort patients
    currentSearchTerm: selectSearch(state),
    currentSortTerm: selectSort(state),
    processedDentists: selectProcessedDentists(state),
    refundingMember: selectRefundingMember(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app 
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    
    // fetch
    fetchDentists: () => dispatch(fetchDentists()),
    fetchDentistMembers: (dentistId) => dispatch(fetchDentistMembers(dentistId)),
    fetchStats: () => dispatch(fetchStats()),

    // setters
    setSelectedDentist: (dentist) => dispatch(setSelectedDentist(dentist)),

    // search / sort patients
    searchDentists: (name) => dispatch(search(name)),
    sortDentists: (status) => dispatch(sort(status)),
    toggleRefundingMember: (id) => dispatch(toggleRefundingMember(id)),
    initiateRefundingMember: (id, amount) => dispatch(initiateRefundingMember(id, amount)),
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
    dentistMembers: React.PropTypes.arrayOf(React.PropTypes.object),
    stats: React.PropTypes.object,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,

    // fetch - dispatch
    fetchDentists: React.PropTypes.func.isRequired,
    fetchDentistMembers: React.PropTypes.func.isRequired,
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
    if (this.props.user) {
      this.props.fetchDentists();
      this.props.fetchStats();
    }
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
      this.props.fetchDentistMembers(dentist.id);
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

  // on refund / transfer
  onRefund = (dentist, patient) => {
    this.props.toggleRefundingMember(patient.id);
  }

  onTransfer = (dentist, patient) => {
    alert('transfer "' + patient.firstName + ' ' + patient.lastName + '"');
  }

  /* Render Dentist Members
   * ------------------------------------------------------ */
  renderDentistMembers = (dentist) => {
    const {
      dentistMembers
    } = this.props;

    // precondition render: the data must be loaded, otherwise wait for it
    if (dentistMembers === null) {
      return (
        <div className="text-center">
          <LoadingSpinner showOnlyIcon={true} />
        </div>
      );
    }

    // precondition render: there are no members to display
    if (dentistMembers.length === 0) {
      return (
        <div className={styles['dentist-members']}>
          The dentist does not have any members yet.
        </div>
      );
    }

    const memberCount = dentistMembers.reduce(
      (memberCounter, patient) => {
        return memberCounter += patient.members.length;
      },
      0
    );

    return (
      <div className={styles['dentist-members']}>
        <p className="text-center">
          Patient Accounts ({dentistMembers.length})
          {' '}
          ~ Total Members ({memberCount})
        </p>

        {dentistMembers.map((patient, index) => {
          return this.renderPatient(dentist, patient, index + 1);
        })}
      </div>
    );
  }

  /* Render Dentist Member
   * ------------------------------------------------------ */
  renderPatient = (dentist, patient, position) => {
    const {
      firstName,
      lastName,

      members,
      subscription: { status },
    } = patient;

    let statusStyle = "";
    switch(status) {
      case "active":
        statusStyle += "status--active";
        break;

      case "past_due":
        statusStyle += "status--past-due";
        break;

      case "canceled":
        statusStyle += "status--canceled";
        break;

      case "inactive":
        statusStyle += "status--inactive";
        break;

      default:
        statusStyle += "status--canceled";
        break;
    }

    const listNum = ("00" + position.toString()).substr(-3, 3); // guarantee a length 3 listNum

    return (
      <div className={"row " + styles['patient']} key={patient.id}>
        <div className="col-sm-6">
          <p>
            <strong>{listNum}) {firstName} {lastName}</strong>
            {' '}
            - <span className={"status " + styles[statusStyle]}>{status}</span>
          </p>
          {
            members.length ?
              <div>
                <p>
                  Family Members:
                </p>

                <ul>
                  {members.map((member) => {
                    const {
                      firstName,
                      lastName,

                      subscription: { status },
                    } = member;

                    const isAccountOwner = patient.id === member.id;

                    let statusStyle = "";
                    switch(status) {
                      case "active":
                        statusStyle += "status--active";
                        break;

                      case "past_due":
                        statusStyle += "status--past-due";
                        break;

                      case "canceled":
                        statusStyle += "status--canceled";
                        break;

                      case "inactive":
                        statusStyle += "status--inactive";
                        break;

                      default:
                        statusStyle += "status--canceled";
                        break;
                    }

                    return (
                      <li key={member.id}>
                        {firstName} {lastName}
                        {' '}
                        - <span className={"status " + styles[statusStyle]}>{status}</span>
                      </li>
                    );
                  })}
                </ul>
              </div> : <p>No Family Members..</p>
          }
        </div>

        <div className="col-sm-6">
          <p>
            <input
              type="button"
              className={styles['button--short']}
              value="REFUNDS"
              onClick={this.onRefund.bind(this, dentist, patient)}
            />
          </p>
          <p>
            <input
              type="button"
              className={styles['button--short']}
              value="TRANSFER"
              onClick={this.onTransfer.bind(this, dentist, patient)}
            />
          </p>
        </div>
      </div>
    );
  }

  handleRefundSubmit = (values) => {
    this.props.initiateRefundingMember(this.props.refundingMember, values.amount);
  };

  cancelRefunding = () => {
    this.props.toggleRefundingMember(null);
  };

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      // fetch
      dentists,
      members,
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
          <AdminDashboardTabs active="members" />

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
          <AdminDashboardTabs active="members" />

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
        <AdminDashboardTabs active="members" />

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
            renderListEntryBody={this.renderDentistMembers}
          />
        </div>

        <RefundMemberForm
          refundingMember={this.props.refundingMember ? true : false}
          onSubmit={this.handleRefundSubmit}
          onCancel={this.cancelRefunding}
         />
      </div>
    );
  }
}
