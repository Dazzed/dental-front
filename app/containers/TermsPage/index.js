import React from 'react';
import CSSModules from 'react-css-modules';

import PageHeader from 'components/PageHeader';

import styles from './styles.css';

/* eslint-disable */
@CSSModules(styles)
class TermsPage extends React.Component {
  render () {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Terms and Conditions" />
        <div className="container">
          <div className="col-md-12">
            <ul>
              <li>
                I understand that if Periodontal disease is present additional treatment will be necessary prior to your regular cleaning.  (?-What is periodontal disease)
              </li>
              <li>
                This is NOT A DISCOUNT PLAN, this is a loyalty membership plan between you and your dentist. HQDental is an intermediary company that processes the plan payments.
              </li>
              <li>
                Cancellation Policy:  Cancel at anytime, however if cancelled in under 3 months, an additional one month cancellation fee will be charged.
              </li>
              <li>
                Re-Enrollment:  If a payment is missed by more than 30 days a Re-Enrollment fee of $99 will be charged to re-start your membership.
              </li>
              <li>
                One cleaning and exam every 6 months is allowed under this plan.
              </li>
              <li>
                One Emergency Exam and xray included per year
              </li>
              <li>
                Membership will be valid for 30 days past the most recent payment.
              </li>
              <li>
                Your membership plan cannot be combined with outside discount plans, dental insurance, or other office promotions.
              </li>
              <li>
                Membership discounts apply to services provided by your dentist not products that they sell.
              </li>
              <li>
                No show fee’s as per your dental providers office policies will apply, please contact your provider regarding any no show penalties prior to scheduling an appointment.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsPage;
