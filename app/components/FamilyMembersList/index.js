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
import {
  MEMBER_RELATIONSHIP_TYPES
} from 'common/constants';
import MembersList from 'components/MembersList';

// local
import styles from './styles.css';


/*
Family Members List
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
class FamilyMembersList extends React.Component {

  static propTypes = {
    // passed in - data
    patient: React.PropTypes.object.isRequired,

    // passed in - event handlers
    onAddMember: React.PropTypes.func,

    onReEnrollMember: React.PropTypes.func.isRequired,
    onRemoveMember: React.PropTypes.func.isRequired,
    onRenewMember: React.PropTypes.func.isRequired,
    onUpdateMember: React.PropTypes.func.isRequired,
  }

  /*
  Delegated Controls
  ------------------------------------------------------------
  */
  onAddClick = () => {
    this.props.onAddMember(this.props.patient);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      patient,

      // passed in - event handlers
      onAddMember,

      onReEnrollMember,
      onRemoveMember,
      onRenewMember,
      onUpdateMember,
    } = this.props;

    const {
      subscription,
    } = patient;

    const aggregateSubscription = {
      status: patient.members.reduce(
        function(aggregateStatus, member) {
          if ( member.subscription.status === 'past_due'
            || aggregateStatus === 'past_due'
          ) {
            aggregateStatus = 'past_due';
          }

          else if (
               member.subscription.status === 'active'
            || aggregateStatus === 'active'
          ) {
            aggregateStatus = 'active';
          }

          // else
          // member status is 'inactive' or 'canceled'
          // aggregate status is 'inactive'
          // leave it as is

          return aggregateStatus;
        },
        'inactive'
      ),

      total: patient.members.reduce(
        function(aggregateTotal, member) {
          if (member.subscription.status === 'active' && member.subscription.monthly) {
            aggregateTotal += parseFloat(member.subscription.monthly);
          }
          return aggregateTotal;
        },
        0
      ),

      dueDate: patient.members.reduce(
        function(nearestPaymentDueDate, member) {
          const memberDueDate = moment(member.subscription.endAt);
          
          if (memberDueDate.isBefore(nearestPaymentDueDate)) {
            nearestPaymentDueDate = memberDueDate;
          }

          return nearestPaymentDueDate;
        },
        moment().add(100, 'years'), // obviously larger than any paid subscription period
      ),
    };

    let statusStyle;
    if (aggregateSubscription.status === 'active') {
      aggregateSubscription.status = 'Active';
      statusStyle = 'status status--active';
    }
    else if (aggregateSubscription.status === 'past_due') {
      aggregateSubscription.status = 'Late';
      statusStyle = 'status status--past-due';
    }
    else {
      aggregateSubscription.status = 'Inactive';
      statusStyle = 'status status--inactive';
    }
    aggregateSubscription.total = aggregateSubscription.total.toFixed(2).replace(".00", "");
    aggregateSubscription.dueDate = aggregateSubscription.dueDate.format("MMMM D, YYYY");

    return (
      <div className="row">
        
        {/*
        Family Members List
        ------------------------------------------------------------
        */}
        <div className="col-sm-9">
          <MembersList
            patient={patient}

            onReEnrollMember={onReEnrollMember}
            onRemoveMember={onRemoveMember}
            onRenewMember={onRenewMember}
            onUpdateMember={onUpdateMember}
          />
        </div>
                         
        <div className="col-sm-3">
          {/*
          Subscription Overview
          ------------------------------------------------------------
          TODO: Clarify what values to show for each member status, and
                how to calculate them.
          */}
          <div styleName="subscription-overview">
            <p>
              Membership:
              <br />
              <span styleName={statusStyle}>{aggregateSubscription.status}</span>
            </p>
            <p>
              Recurring Payment Date:
              <br />
              <span styleName="subscription-overview__info">{aggregateSubscription.dueDate}</span>
            </p>
            <p>
              Total Monthly Payment:
              <br />
              <span styleName="subscription-overview__info">${aggregateSubscription.total}</span>
            </p>
          </div>

          {/*
          Controls
          ------------------------------------------------------------
          */}
          {onAddMember && (
            <div styleName="controls">
              <p>
                <input
                  type="button"
                  styleName="button--wide"
                  value="ADD MEMBER"
                  onClick={this.onAddClick}
                />
              </p>
            </div>
          )}

        {/* End Right Col */}
        </div>

      {/* End Member Details Row */}
      </div>
    );
  }

}

export default FamilyMembersList;
