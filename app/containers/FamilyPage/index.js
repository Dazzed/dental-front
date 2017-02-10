/*
Patient Family Page
================================================================================
Route: `/your-family`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// app
import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';

// local
import {
  fetchFamilyMembers,
} from './actions';
import {
  membersSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    members: membersSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),
  };
}


/*
Family
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class FamilyPage extends React.Component {

  static propTypes = {
    // state
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),

    // dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    fetchFamilyMembers: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      showAddFamilyMemberModal: false,
    };
  }

  componentDidMount () {
    this.props.changePageTitle('Update Your Family Information');
    this.props.fetchFamilyMembers();
  }

  toggleAddFamilyMemberModal = () => {
    this.setState({
      ...this.state,
      showAddFamilyMemberModal: !this.state.showAddFamilyMemberModal,
    });
  }

  render () {
    const { members } = this.props;

    console.log(members);

    // precondition: the data must be loaded, otherwise wait for it
    if (members === false) {
      return (
        <div>
          <PatientDashboardTabs active="family" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    const memberRows = members.map((member) => {
      const {
        avatar,
        familyRelationship,
        firstName,
        id,
        lastName,
        subscription,
        type,
      } = member;

      const profilePhoto = avatar !== null
                         ? (<img src={avatar} alt="Member Profile Photo" />)
                         : (<FaUser />);

      const relationship = familyRelationship !== null
                         ? MEMBER_RELATIONSHIP_TYPES[familyRelationship]
                         : "Self";

      const accountOwner = familyRelationship !== null
                         ? null
                         : (<div styleName="members__member__owner">Primary Account Owner</div>);

      const fee = subscription
                ? "$" + subscription.monthly
                : "---";

      return (
        <div className="row" styleName="members__member" key={id}>

          <div className="col-sm-2">
            <div styleName="members__member__profile">
              {profilePhoto}
            </div>
          </div>

          <div className="col-sm-3">
            <div styleName="members__member__name">
              {firstName} {lastName}
              {accountOwner}
            </div>
          </div>

          <div className="col-sm-2">
            <div styleName="members__member__info">
              {relationship}
            </div>
          </div>

          <div className="col-sm-1">
            <div styleName="members__member__info">
              {type}
            </div>
          </div>

          <div className="col-sm-1">
            <div styleName="members__member__info">
              {fee}
            </div>
          </div>

          <div className="col-sm-3">
            <div styleName="members__member__info">
              TODO

              <div styleName="members__member__controls">
                {/* TODO: onClick */}
                <input
                  type="button"
                  styleName="button--short"
                  value="Edit"
                />

                {/* TODO: onClick */}
                <input
                  type="button"
                  styleName="button--short--lowlight"
                  value="Cancel"
                />
              </div>

            </div>
          </div>

        </div>
      );
    });

    return (
      <div>
        <PatientDashboardTabs active="family" />

        <div styleName="content">
          <div styleName="add-family-member-wrapper">
            <input
              type="button"
              styleName="button"
              value="ADD FAMILY MEMBER +"
              onClick={this.toggleAddFamilyMemberModal}
            />
          </div>

          {/*
          List Family Members & User
          ------------------------------------------------------------
          */}
          <div className="grid" styleName="members">
            <div className="row" styleName="members__title">
              <div className="col-sm-2">
                {/* profile pic */}
              </div>
              <div className="col-sm-3">
                Name
              </div>
              <div className="col-sm-2">
                Relationship
              </div>
              <div className="col-sm-1">
                Type
              </div>
              <div className="col-sm-1">
                Fee
              </div>
              <div className="col-sm-3">
                Member Since
              </div>
            </div>

            {memberRows}
          </div>
          
        </div>

        {/*
        Add Family Member Modal
        ------------------------------------------------------------
        */}
        <Modal
          backdrop={true}
          onHide={this.toggleAddFamilyMemberModal}
          show={this.state.showAddFamilyMemberModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add A Family Member</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            TODO
          </Modal.Body>

          <Modal.Footer>
            TODO
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

}

export default FamilyPage;
