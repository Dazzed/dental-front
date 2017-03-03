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
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';

// app
import {
  MEMBER_RELATIONSHIP_TYPES
} from 'common/constants';

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
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
  }

  // NOTE: bind the member to this function
  onEditClick = (member) => {
    this.props.onEdit(member);
  }

  // NOTE: bind the member to this function
  onRemoveClick = (member) => {
    this.props.onRemove(member);
  }

  render() {
    const {
      members
    } = this.props;

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

      const removePopover = (
        <Popover id="remove-popover" title="Are you sure?">
          <p>Please confirm that you want to remove <strong>'{firstName} {lastName}'</strong> from your plan.</p>

          <div className="text-center">
            <input
              type="button"
              className={styles["button--short--lowlight"]}
              value="Confirm Removal"
              onClick={this.onRemoveClick.bind(this, member)}
            />
          </div>
        </Popover>
      );

      const controls = isOwner
                     ? null
                     : (<div styleName="members__member__controls">
                          <input
                            type="button"
                            styleName="button--short"
                            value="Edit"
                            onClick={this.onEditClick.bind(this, member)}
                          />

                          <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={removePopover}>
                            <input
                              type="button"
                              styleName="button--short--lowlight"
                              value="Remove"
                            />
                          </OverlayTrigger>
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
