import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';

import { fetchMyPatients, requestReport } from 'containers/Dashboard/actions';
import { selectUserName } from 'containers/App/selectors';
import { selectGroupedPatients } from 'containers/Dashboard/selectors';

import InvitePatientModal from 'components/InvitePatientModal';
import Intro from './Intro';
import RevenueStats from './RevenueStats';
import PatientGroup from './PatientGroup';
import styles from './index.css';

const groups = [
  { key: 'newMembers', title: 'New Members' },
  { key: 'newReviews', title: 'New Review' },
  { key: 'activeMembers', title: 'Active Members' },
  { key: 'inactiveMembers', title: 'Inactive Members' },
  { key: 'allReviews', title: 'Reviews' },
];

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class DentistDashboard extends Component {
  static propTypes = {
    userName: PropTypes.string,
    patients: PropTypes.object,
    fetchMyPatients: PropTypes.func.isRequired,
    requestReport: PropTypes.func.isRequired,
    changeRoute: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      showInviteModal: false,
    };
  }

  componentWillMount () {
    this.props.fetchMyPatients();
  }

  openInviteModal = () => {
    this.setState({
      ...this.state,
      showInviteModal: true,
    });
  }

  closeInviteModal = () => {
    this.setState({
      ...this.state,
      showInviteModal: false,
    });
  }

  requestReport = () => {
    this.props.requestReport();
  }

  render () {
    const { userName, patients } = this.props;

    const activeCount = patients.activeMembers.length;
    const inactiveCount = patients.inactiveMembers.length;
    const pastDueCount = patients.dueMembers && patients.dueMembers.length;

    return (
      <div className="dentist-dashboard-container">
        <Intro name={userName} changeRoute={this.props.changeRoute} />

        <div styleName="h3-with-button" className="clearfix">
          <h3>List Total Active Members</h3>
          <button
            className="btn btn-padding btn-darkest-green btn-round"
            onClick={this.openInviteModal}
          >
            Invite client
          </button>
          <button
            className="btn btn-green btn-round"
            onClick={this.requestReport}
          >
            Report
          </button>
        </div>

        <div
          styleName="patients-overview"
          style={{ fontWeight: 'bold', marginBottom: '10px' }}
        >
          <div styleName="total-info">
            Active{' '}
            <span styleName="active">
              {`(${activeCount || 0})`}
            </span>
            {',  '}&nbsp;&nbsp;Inactive{' '}
            <span styleName="inactive">
              {`(${inactiveCount || 0})`}
            </span>
            {','}&nbsp;&nbsp;Past Due{' '}
            <span>
              {`(${pastDueCount || 0})`}
            </span>
          </div>
          <div styleName="sorter">
            Sort By
          </div>
        </div>

        {groups.map((group, index) =>
          <PatientGroup
            key={index}
            title={group.title}
            groupKey={group.key}
            patients={patients[group.key]}
          />
        )}

        <RevenueStats total={67800} />

        <InvitePatientModal
          showModal={this.state.showInviteModal}
          onClose={this.closeInviteModal}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    userName: selectUserName(state),
    patients: selectGroupedPatients(state)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyPatients: () => dispatch(fetchMyPatients()),
    changeRoute: (url) => dispatch(push(url)),
    requestReport: () => dispatch(requestReport()),
  };
}
