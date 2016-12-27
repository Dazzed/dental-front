import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { fetchMyPatients, requestReport } from 'containers/Dashboard/actions';
import { selectUserName } from 'containers/App/selectors';
import {
  groupedAndFilteredPatientsSelector
} from 'containers/Dashboard/selectors';

import InvitePatientModal from 'components/InvitePatientModal';
import Intro from './Intro';
import PatientGroup from './PatientGroup';
import PatientAutosuggest from './PatientAutosuggest';
import styles from './index.css';

const groups = [
  { key: 'newMembers', title: 'New Members' },
  { key: 'newReviews', title: 'New Reviews' },
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

        <h3 styleName="list-header">List Total Active Members</h3>

        <Row styleName="filter-bar">
          <Col md={6}>
            <PatientAutosuggest />
          </Col>
          <Col md={6} className="text-right">
            <button
              styleName="action-button"
              className="btn btn-green btn-round"
              onClick={this.requestReport}
            >
              Report
            </button>
            <button
              styleName="action-button"
              className="btn btn-padding btn-darkest-green btn-round"
              onClick={this.openInviteModal}
            >
              Invite client
            </button>
          </Col>
        </Row>

        <div styleName="patients-overview">
          <div styleName="total-info">
            Active{' '}
            <span styleName="active">
              {`(${activeCount || 0})`}
            </span>
            {','}&nbsp;&nbsp;Inactive{' '}
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

        <br />

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
    patients: groupedAndFilteredPatientsSelector(state)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyPatients: () => dispatch(fetchMyPatients()),
    changeRoute: url => dispatch(push(url)),
    requestReport: () => dispatch(requestReport()),
  };
}
