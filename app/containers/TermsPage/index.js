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
          <div className="col-md-12" styleName="container">
            <ul>

              <li>
                <div styleName="title">
                  A Dental Membership Plan is NOT dental insurance.
                </div>
                <div styleName="description">
                  The Dental Membership Plan does not make payments to your dentist for the services you receive. The Dental Membership Plan is a loyalty program between you and your dentist. By enrolling in the Dental Membership Plan and making your monthly payments under the plan, you become eligible to receive certain dental services from your dentist. These services are described below. DentalHQ is not an insurance company, it is an intermediary company that processes payments for your Dental Membership Plan on behalf of your dentist.
                </div>
              </li>

              <li>
                <div styleName="title">
                  Covered Services and Non-Covered Services
                </div>
                <div styleName="description">
                  The following services are provided under the Dental Membership Plan between you and your dentist:
                  <ul>
                    <li>
                      You are eligible to receive one (1) cleaning and one (1) dental exam every six (6) months.
                    </li>
                    <li>
                      You are eligible to receive one (1) set of bitewing x-rays per year, one (1) panoramic x-ray every three (3) years, and any other dental x-rays that your dentist deems necessary during your covered exams.
                    </li>
                    <li>
                      You are eligible to receive one (1) emergency exam and one (1) emergency x-ray per year.
                    </li>
                    <li>
                      Children under the age of 13 who are enrolled in the Children’s Membership Plan will be eligible to receive one (1) fluoride treatment per year.
                    </li>
                    <li>
                      It is possible that, during the course of treatment by your dentist, he or she may discover a dental or health condition that may require further treatment—the costs associated with any further treatment are your responsibility and are not covered under the Dental Membership Plan.
                    </li>
                    <li>
                      Periodontal disease, also known as gum disease, can range from relatively-minor gum inflammation to much more serious forms of disease that can damage the soft tissue and bone that support the teeth.  If your dentist determines that you have periodontal disease, he or she may recommend additional treatment before you are able to have a regular cleaning.  If you do have periodontal disease and require additional treatment, you will be responsible for the costs associated with that treatment.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <div styleName="title">
                  Other Fees, Discounts, and Products
                </div>
                <div styleName="description">
                  <ul>
                    <li>
                      Any late fees or missed-appointment fees that your dentist may charge will still apply—you should contact your dentist regarding any no show penalties before scheduling an appointment.
                    </li>
                    <li>
                      You may not combine your Dental Membership Plan with any other discounts, discount plans, dental insurance (including Medicare, Medicaid, or any other forms of government insurance or assistance, and/or any private insurance plan or policy) or in-office promotions.
                    </li>
                    <li>
                      Discounts provided under the Dental Membership Plan apply only to services provided by your dentist, and not products that your dentist may sell.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <div styleName="title">
                  Monthly Payment Required
                </div>
                <div styleName="description">
                  Your membership in the Dental Membership Plan is valid for thirty (30) days following your most recent payment—you must make monthly payments to maintain your eligibility for services under the Dental Membership Plan.
                </div>
              </li>

              <li>
                <div styleName="title">
                  Cancellation Policy
                </div>
                <div styleName="description">
                  You may cancel your Dental Membership Plan at any time and for any reason.  If you cancel your participation in a Dental Membership Plan within three months of enrolling in the plan, DentalHQ will charge a one-time administrative fee equal to Twenty Dollars ($20.00) per member, to offset the costs associated with processing your Dental Membership Plan enrollment.
                </div>
              </li>

              <li>
                <div styleName="title">
                  Re-Enrollment
                </div>
                <div styleName="description">
                  If you decide to cancel your membership, or if your monthly payment for your Dental Membership Plan is delinquent by more than 60 days, DentalHQ will move your account to inactive status. While your account is in inactive status, your Dental Membership Plan will be suspended with your dental office.  Although you may continue to see your dentist, while your account is inactive status any services provided to you by your dentist will not be covered by the Dental Membership Plan, and you will be responsible for payment of any costs of treatment.  If you decide to re-instate your Dental Membership Plan through DentalHQ, DentalHQ will charge a Ninety Nine Dollars ($99.00) re-enrollment fee, per member, to offset the costs associated with processing your Dental Membership Plan re-enrollment.
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsPage;
