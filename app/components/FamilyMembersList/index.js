/*
Patient Family Members List Component
================================================================================
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

// app
import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';

// local
import styles from './styles.css';


/*
Family Members List
================================================================================
*/
@CSSModules(styles)
class FamilyMembersList extends React.Component {

  static propTypes = {
    // passed in
    onCancel: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
  }

  onEditClick = (index) => {
    const member = this.props.members[index];

    return () => {
      this.props.onEdit(member);
    };
  }

  onCancelClick = (index) => {
    const member = this.props.members[index];

    return () => {
      this.props.onCancel(member);
    };
  }

  render() {
    const { onCancel, onEdit, members } = this.props;

    const memberRows = members.map((member, index) => {
      const {
        avatar,
        familyRelationship,
        firstName,
        id,
        lastName,
        subscription,
        type,
      } = member;

      const isOwner = familyRelationship === null; // Is a string key for other family members.

      const profilePhoto = avatar !== null
                         ? (<img src={avatar} alt="Member Profile Photo" />)
                         : (<FaUser />);

      const relationship = isOwner
                         ? "Self"
                         : MEMBER_RELATIONSHIP_TYPES[familyRelationship];

      const accountOwner = isOwner
                         ? (<div styleName="members__member__owner">Primary Account Owner</div>)
                         : null;

      const fee = subscription
                ? "$" + subscription.monthly
                : "---";

      const controls = isOwner
                     ? null
                     : (<div styleName="members__member__controls">
                          <input
                            type="button"
                            styleName="button--short"
                            value="Edit"
                            onClick={this.onEditClick(index)}
                          />

                          <input
                            type="button"
                            styleName="button--short--lowlight"
                            value="Cancel"
                            onClick={this.onCancelClick(index)}
                          />
                        </div>
                       );

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
              {controls}
            </div>
          </div>

        </div>
      );
    });

    return (
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
    );
  }

}

export default FamilyMembersList;
