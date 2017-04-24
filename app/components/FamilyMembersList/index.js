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

    let statusStyle = "status";
    switch(subscription.status) {
      case "active":
        statusStyle += " status--active";
        break;

      case "past_due":
        statusStyle += " status--past-due";
        break;

      case "canceled":
        statusStyle += " status--canceled";
        break;

      case "inactive":
        statusStyle += " status--inactive";
        break;

      default:
        // Status is unknown, so don't add anything;
        break;
    }

    const paymentDueAmount = parseFloat(subscription.total).toFixed(2);

    const paymentDueDate = moment(subscription.endAt).format("MMMM D, YYYY");

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
              <span styleName={statusStyle}>{subscription.status}</span>
            </p>
            <p>
              Recurring Payment Date:
              <br />
              <span styleName="subscription-overview__info">{paymentDueDate}</span>
            </p>
            <p>
              Total Monthly Payment:
              <br />
              <span styleName="subscription-overview__info">${paymentDueAmount}</span>
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
