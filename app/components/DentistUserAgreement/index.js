/*
Dentist User Agreement Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import CSSModules from 'react-css-modules';

// local
import styles from './styles.css';


/*
Dentist User Agreement
================================================================================
*/
const PDF_URL = '/documents/dentalhq-dentist-user-agreement.pdf';

@CSSModules(styles)
class DentistUserAgreement extends React.Component {

  static propTypes = {
    showAcceptButton: React.PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.state = {
      agreed: false,
    };
  }

  printTerms = () => {
    // TODO
    const pdf = window.open(PDF_URL);
    pdf.print();
  }

  onAgreeToggle = () => {
    const agreed = !this.state.agreed;

    this.setState({
      agreed: agreed
    })

    if (this.props.onAgreed && agreed) {
      this.props.onAgreed();
    }
  }

  render () {
    const {
      showAcceptButton,
    } = this.props;

    return (
      <div styleName="dentistUserAgreement">
        <div styleName="term">
          <h4 styleName="term__title">
            {/* TODO: put logo here */}
            EFFECTIVE DATE: NOVEMBER 1, 2017
          </h4>
          <p styleName="term__description">
            <a href="#" onClick={this.printTerms} styleName="action-link">Print</a>
            {' '}<a href={PDF_URL} target="_blank" styleName="action-link">Download</a>
          </p>
        </div>

        <div styleName="term">
          <p styleName="term__description">
            Thank you for choosing to partner with DentalHQ to create your custom branded in-office Membership Plan (the “Dental Membership Plan”).
          </p>
          <p styleName="term__description">
            This agreement describes how DentalHQ will work with you to provide your patients with an awesome in-office membership plan. You may cancel at any time.  If you need assistance with the use of the software, please let your Account Manager know. He or she can be reached at (919) 825-1239 or by email at info@dentalhq.com. Your account manager will provide a demonstration of the software if they have not already. This is the base software and it can be customized for your practice. This software allows you to set up a recurring dental membership plan for your patients whereby a patient will pay your practice a fixed monthly or annual fee, and in exchange you will provide certain services free of additional charge while their membership is active. All members who use DentalHQ join a Dental Membership Plan must agree to the Dental Membership Plan Terms and Conditions (the “Terms and Conditions”) that may be found here: <a href="/terms" target="_blank">http://www.dentalhq.com/terms</a>.
          </p>
          <p styleName="term__description">
            A brief outline of how you can use DentalHQ to set up a Dental Membership Plan for your practice is set forth below.
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 1: Membership Fees / Services</h4>
          <p styleName="term__description">
            When you use DentalHQ to set up your Dental Membership Plan, you will determine the fees that you will charge to your members for your new plan.  These fees will be processed by DentalHQ through our online platform and remitted to you as described below.
          </p>
          <p styleName="term__description">
            In exchange for the membership fee that you establish, you agree to provide the following services (the “Covered Services”) to your members:
          </p>

          <h5 styleName="term__subtitle">
            Covered Services for standard memberships are:
          </h5>

          <div className="row" styleName="term__description">
            <div className="col-sm-3">
              <u>Members ages 14 or greater:</u>
            </div>
            <div className="col-sm-9">
              <ul>
                <li>One (1) basic cleaning every six (6) months (d1110);</li>
                <li>Up to two (2) exams with cleanings per year (d0120);</li>
                <li>X-rays as determined necessary by your Dentist (d0210, d0274, d0272, d0220, d0330); and </li>
                <li>One (1) emergency exam per year(d0140).</li>
              </ul>
            </div>
          </div>

          <div className="row" styleName="term__description">
            <div className="col-sm-3">
              <u>Members under 13 years of age:</u>
            </div>
            <div className="col-sm-9">
              <ul>
                <li>One (1) basic cleaning every six (6) months (d1110);</li>
                <li>Up to two (2) exams with cleanings per year (d0120);</li>
                <li>X-rays as determined necessary by your Dentist (d0210, d0274, d0272, d0220, d0330); </li>
                <li>One (1) emergency exam per year(d0140); and</li>
                <li>1 fluoride treatment per year (d1208).</li>
              </ul>
            </div>
          </div>

          <p styleName="term__description">
            Only those services specifically listed as Covered Services are provided by you at no additional charge. If any dental services that are not Covered Services are required, you can provide these Non-Covered Services at your then-current rates, minus any applicable discount you have selected when you use DentalHQ to establish your Dental Membership Plan.
          </p>

          <p styleName="term__description">
            <em>
              **We need to remind you that DentalHQ is not an insurance company and a Dental Membership Plan is not a contract of insurance. A Dental Membership Plan is a prepaid discount membership package of dental services of which you will be the designated provider. We only provide the software by which you will operate your Dental Membership Plan, a mechanism to collect Dental Membership Plan fees, custom branded marketing materials, and marketing assistance for your Dental Membership Plan. You further acknowledge and agree that neither you nor your practice or staff will transmit any Protected Health Information (as defined at 45 C.F.R. § 160.103) to DentalHQ, or attempt to enter such information in the software. DentalHQ will not be responsible for any individually identifiable member information provided by you or your dental practice except information pursuant to an authorization signed by the member.
            </em>
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 2: Management Fees/Reimbursement</h4>
          <p styleName="term__description">
            In consideration for providing the software and management services, and branding materials for your Dental Membership Plan, you agree to pay DentalHQ 11% of all Plan revenue. This includes all monthly and annual membership fees collected from your members through DentalHQ, but excludes any costs or fees for Non-Covered Services (you will bill the patient directly for such services).
          </p>
          <p styleName="term__description">
            DentalHQ will provide the following services:
          </p>
          <ul styleName="term__description">
            <li>
              All merchant processing fees;
            </li>
            <li>
              Maintaining PCI DSS requirements;
            </li>
            <li>
              Branded marketing materials for your office;
            </li>
            <li>
              Use of the software, and training for your team; and
            </li>
            <li>
              Participation in the DentalHQ Marketplace.
            </li>
          </ul>
          <p styleName="term__description">
            DentalHQ will process all membership fees paid under your Dental Membership Plan, and on a monthly basis will remit such fees to you, less the 11% payment due to DentalHQ. This remittance will be paid not later than eight (8) business days after the end of the applicable month, and will include a detailed report of both the revenue received under your Dental Membership Plan through DentalHQ and the calculation of the 11% payment to DentalHQ. The report will include the names of all Dental Membership Plan participants (“members”) and the payments received by each member in the applicable month. Note that in certain instances, as set forth in the Dental Membership Plan Terms and Conditions, we are required to refund payment to the Plan members. In the event that we refund any amount to members due to a billing error or the Plan member’s cancellation of his/her membership in the Dental Membership Plan, we may make a corresponding adjustment to the payments due to you or a corresponding offset to the future payments due you.
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 3: Marketing Materials/Marketplace</h4>
          <p styleName="term__description">
            In connection with your use of our software, we will provide the following marketing services for the Dental Membership Plan. DentalHQ has designed “custom branded in-office” marketing materials, as well as digital marketing materials that can be used on your website. Please provide your logo to your Account Manager to have [100] fully branded informational cards created for your office. You will receive a welcome packet with your internal marketing materials. Reasonable amounts of additional marketing materials will be provided at no charge.
          </p>
          <p styleName="term__description">
            DentalHQ has created an innovative, comprehensive, consumer-driven Marketplace to target new patients for your practice. This Marketplace is informational, and will provide information about your practice including; location, contact info, membership pricing, services offered, pictures, reviews and an affordability index that ranks your pricing against other dental practices in your area. While we collect certain dental code fees from your office to help you determine your membership fees and your affordability index, we will not share these fees with anyone, and those codes and fees will not be tied to any individuals or actual treatment or services you provide. If you do not wish to be listed in our Marketplace, please indicate so by clicking the corresponding button on your signup page.
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 4: Reviews</h4>
          <p styleName="term__description">
            Your members will be able to leave reviews/feedback of your office and practice in the Marketplace through our software. These reviews will appear on your dashboard for you to review after they have been completed by your members. You will have 7 days to respond to a review before the review is posted onto the Marketplace web site. DentalHQ will not be able to indiscriminately remove reviews, so please make every effort to remedy a negative review within the 7-day window.
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 5: Member Refunds</h4>
          <p styleName="term__description">
            Members may cancel their membership in the Dental Membership Plan at any time. To cancel within the first ninety (90) days following enrollment, a member must contact your office to request cancellation.  DentalHQ will provide, on your behalf, a full refund to members of a Dental Membership Plan who cancel their membership within the first ninety (90) days of enrolling. However, if the member has been provided any dental services under your Dental Membership Plan during the initial ninety-day period, then you may bill the member for the services that you rendered at your then-current rates. Following the initial ninety (90) days, a member will be able to cancel his/her membership using the member dashboard on the Site. 
          </p>
          <p styleName="term__description">
            Any refund provided to a member will be deducted from your next month’s payment if payment has already been remitted to you. If payment has not yet been remitted to you, the refunded payment will simply cancel out any payment that has already been made by the member. If you determine that any of your current members should be refunded part of all of their membership payment, please contact your Account Manager to process the refund.
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 6: Copyright</h4>
          <p styleName="term__description">
            During the term of this Agreement and for one (1) year thereafter, you will not directly or indirectly, for yourself of for the benefit of any third party, develop any process, method, service or software that competes with the business of DentalHQ or our software. In no event will you attempt to reverse engineer, copy, imitate, transfer or create a derivative work of our software or its documentation or related marketing materials. If DentalHQ, in its sole discretion, determines that you have entered into an agreement with a company that competes with DentalHQ or its products and services, DentalHQ may immediately terminate this Agreement and pursue any other rights and remedies that DentalHQ may have hereunder.
          </p>
        </div>

        <div styleName="term">
          <h4 styleName="term__title">Section 7: Indemnity/Liability Waiver</h4>
          <p styleName="term__description">
            IN NO EVENT WILL WE BE LIABLE TO YOU FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING DAMAGES FOR ANY LOST PROFITS ARISING FROM YOUR USE OF OUR SOFTWARE, EVEN IF WE ARE AWARE OR HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO ANY FEES THAT WE HAVE COLLECTED FOR YOUR PLAN AND OWE TO YOU LESS THE PAYMENT DUE US.
          </p>
          <p styleName="term__description">
            You agree to defend, indemnify and hold us harmless from and against any loss, liability, claim, or demand, including reasonable attorneys’ fees, arising out of any claim, action, investigation or proceeding made or instituted by any third party due to or arising out of your participation in the Dental Membership Plan.
          </p>
          <p styleName="term__description">
            This letter agreement (the “Agreement”) will commence on the date first set forth above and will continue on a month to month basis until such time as either party terminates this Agreement by giving the other party not less than ten (10) days prior written notice of termination. Notwithstanding the foregoing, should either party commit a breach of its obligations hereunder, which is not capable of being cured, the other party may, at its option, terminate this Agreement immediately upon written notice of termination, which notice shall identify and describe the basis for such termination. Please be advised that although you may terminate this Agreement and your use of the software at any time, the patients who are enrolled in your dental membership plan have been paying a monthly or annual membership fee and will likely be unhappy if the membership is terminated without warning. Consequently, we strongly encourage a minimum of 3 months’ written notice to all of your current members prior to cancelling your participation in the dental membership plan.
          </p>
        </div>

        <div styleName="term">
          <p styleName="term__description">
            If this Agreement is satisfactory, please indicate your acceptance of these terms by clicking “I Agree” below.
          </p>

          <p styleName="term__description">
            Very truly yours,
            <br />
            DENTALHQ, LLC
          </p>

          <p styleName="term__description">
            <label>
              <input
                type="checkbox"
                onChange={this.onAgreeToggle}
                checked={this.state.agreed}
              />
              {' '}I Agree
            </label>
          </p>
        </div>

        {showAcceptButton === true && (
          <span></span>                    
        )}
      </div>
    );
  }

}

export default DentistUserAgreement;
