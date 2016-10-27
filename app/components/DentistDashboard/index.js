import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';

import { fetchMyPatients } from 'containers/Dashboard/actions';
import { selectUserName } from 'containers/App/selectors';
import {
  selectNewMembers,
  selectNewReviews,
  selectAllMembers,
  selectSorter,
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
    sorter: PropTypes.object,
    fetchMyPatients: PropTypes.func.isRequired,
    changeRoute: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      showInviteModal: false,
    };

    this.openInviteModal = this.openInviteModal.bind(this);
    this.closeInviteModal = this.closeInviteModal.bind(this);
  }

  componentWillMount () {
    this.props.fetchMyPatients();
  }

  openInviteModal () {
    this.setState({
      ...this.state,
      showInviteModal: true,
    });
  }

  closeInviteModal () {
    this.setState({
      ...this.state,
      showInviteModal: false,
    });
  }

  render () {
    const { userName, patients, sorter } = this.props;

    return (
      <div className="dentist-dashboard-container">
        <Intro name={userName} changeRoute={this.props.changeRoute} />

        <div styleName="h3-with-button" className="clearfix">
          <h3>List Total Active Members</h3>
          <Button
            className="btn btn-round btn-primary"
            onClick={this.openInviteModal}
          >
            Invite client
          </Button>
        </div>

        <Well>
          {groups.map((group, index) =>
            <PatientGroup
              key={index}
              title={group.title}
              patients={patients[group.key]}
              sorter={sorter[group.key]}
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
    sorter: selectSorter(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyPatients: () => dispatch(fetchMyPatients()),
    changeRoute: (url) => dispatch(push(url)),
  };
}
