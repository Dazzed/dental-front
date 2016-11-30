import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import Well from 'react-bootstrap/lib/Well';

import { fetchMyPatients, requestReport } from 'containers/Dashboard/actions';
import { selectUserName } from 'containers/App/selectors';
import {
  selectNewMembers,
  selectNewReviews,
  selectAllMembers,
} from 'containers/Dashboard/selectors';

import InvitePatientModal from 'components/InvitePatientModal';
import Intro from './Intro';
import RevenueStats from './RevenueStats';
import PatientGroup from './PatientGroup';
import styles from './index.css';

const groups = [
  { key: 'newMembers', title: 'New Members' },
  { key: 'newReviews', title: 'New Review(s)' },
  { key: 'allMembers', title: 'Members' },
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

    let inactive = 0;
    let active = 0;
    let pastDue = 0;
    const allMembers = patients.allMembers;

    if (allMembers) {
      inactive = allMembers.filter(item =>
        item.subscriptions[0].status === 'inactive'
      ).length;

      active = allMembers.filter(item =>
        item.subscriptions[0].status === 'active'
      ).length;

      pastDue = allMembers.filter(item =>
        item.subscriptions[0].status === 'past_due'
      ).length;
    }

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

        <Well>
          <div styleName="total-info">
            Active{' '}
            <span styleName="active">
              {`(${active})`}
            </span>
            {', '}Inactive{' '}
            <span styleName="inactive">
              {`(${inactive})`}
            </span>
            {', '}Past Due{' '}
            <span>
              {`(${pastDue})`}
            </span>
          </div>

          {groups.map((group, index) =>
            <PatientGroup
              key={index}
              title={group.title}
              groupKey={group.key}
              patients={patients[group.key]}
            />
          )}
        </Well>

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
    patients: {
      newMembers: selectNewMembers(state),
      newReviews: selectNewReviews(state),
      allMembers: selectAllMembers(state),
    },
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyPatients: () => dispatch(fetchMyPatients()),
    changeRoute: (url) => dispatch(push(url)),
    requestReport: () => dispatch(requestReport()),
  };
}
