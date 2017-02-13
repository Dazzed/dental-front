/*
Patient Family Members Plan Summary Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import CSSModules from 'react-css-modules';

// app
import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';

// local
import styles from './styles.css';


/*
Family Members Plan Summary
================================================================================
*/
@CSSModules(styles)
class FamilyMembersPlanSummary extends React.Component {

  static propTypes = {
    // passed in
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
  }

  render() {
    const { members } = this.props;

    const memberRows = members.map((member, index) => {
      const {
        familyRelationship,
        firstName,
        id,
        lastName,
        subscription,
        type,
      } = member;

      const isOwner = familyRelationship === null; // Is a string key for other family members.

      const relationship = isOwner
                         ? "You"
                         : MEMBER_RELATIONSHIP_TYPES[familyRelationship];

      const fee = subscription
                ? "$" + subscription.monthly
                : "---";

      return (
        <div className="row" styleName="plan-details__entry" key={id}>
          <div className="col-md-4" styleName="plan-details__entry__title">{firstName} {lastName}</div>
          <div className="col-md-3">{relationship}</div>
          <div className="col-md-3">{type}</div>
          <div className="col-md-2">{fee}</div>
        </div>
      );
    });

    let totalFee = members.reduce((currentTotal, member) => {
      if (member.subscription) {
        currentTotal += parseFloat(member.subscription.monthly);
      }

      return currentTotal;
    }, 0);

    totalFee = "$" + totalFee.toFixed(2);

    return (
      <div>

        <div styleName="plan-details">
          <div className="row" styleName="plan-details__header">
            <div className="col-md-4">Name</div>
            <div className="col-md-3">Relationship</div>
            <div className="col-md-3">Plan Type</div>
            <div className="col-md-2">Monthly Fee</div>
          </div>

          {memberRows}
        </div>

        <div className="row" styleName="plan-total">
          <div className="col-md-10" styleName="plan-total__label">
            Total Monthly Membership Fee:
          </div>

          <div className="col-md-2" styleName="plan-total__amount">
            {totalFee}
          </div>
        </div>

      </div>
    );
  }

}

export default FamilyMembersPlanSummary;
