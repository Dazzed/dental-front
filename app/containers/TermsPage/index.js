import React from 'react';
import CSSModules from 'react-css-modules';

import PageHeader from 'components/PageHeader';

import styles from './styles.css';

/* eslint-disable */
@CSSModules(styles)
class TermsPage extends React.Component {

  printTerms = () => {
    const pdf = window.open('/documents/dentalhq-terms-of-service.pdf');
    pdf.print();
  }

  render() {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Terms and Conditions" />
        <div className="container">

          <div styleName="term">
            <h4 styleName="term__title">EFFECTIVE DATE: NOVEMBER 1, 2017</h4>
            <p styleNmae="term__description">
              <a href="#" onClick={this.printTerms} styleName="action-link">Print</a>
              {' '}<a href="/documents/dentalhq-terms-of-service.pdf" target="_blank" styleName="action-link">Download</a>
            </p>
          </div>

          <div styleName="term">
            <p styleName="term__description">
              BY  AGREEING TO THESE TERMS AND CONDITIONS, BY ENROLLING IN A PREPAID PLAN FOR DISCOUNTED DENTAL SERVICES ("<u>DENTAL MEMBERSHIP PLAN</u>") OFFERED BY AN INDEPENDENT DENTIST OR DENTAL PRACTICE ("<u>DENTIST</u>"), AND BY ENROLLING IN AND PAYING THE APPLICABLE ENROLLMENT FEE, INCLUDING ANY RENEWAL FEES (COLLECTIVELY, THE "<u>MEMBERSHIP FEE</u>") FOR A DENTAL MEMBERSHIP PLAN THROUGH DENTALHQ.COM (THE "SITE"), YOU ACKNOWLEDGE THAT YOU HAVE READ AND THAT YOU AGREE TO THE FOLLOWING TERMS AND CONDITIONS OF DENTALHQ, LLC (TOGETHER WITH ITS AFFILIATES, SUCCESSORS, AND ASSIGNS HEREINAFTER REFERRED TO AS "<u>DENTALHQ</u>", "<u>OUR</u>", "<u>WE</u>," OR "<u>US</u>").  IMPORTANT ADDITIONAL INFORMATION REGARDING THE DENTAL MEMBERSHIP PLAN IS AVAILABLE ON THE SITE AND THROUGH THE DENTIST OFFERING THE DENTAL MEMBERSHIP PLAN.
            </p>
            <p styleName="term__description">
              THESE TERMS AND CONDITIONS AND YOUR ENROLLMENT IN A DENTAL MEMBERSHIP PLAN THROUGH THE SITE CONSTITUTE A BINDING AGREEMENT BETWEEN YOU, YOUR DENTIST, AND DENTALHQ (THE "<u>AGREEMENT</u>"). IF YOU DO NOT AGREE TO THESE TERMS AND CONDITIONS, DO NOT USE THE SITE TO ENROLL IN A DENTAL MEMBERSHIP PLAN. THESE TERMS AND CONDITIONS ALSO GOVERN YOUR USE OF THE SITE.
            </p>
            <p styleName="term__description">
              WE RESERVE THE SOLE RIGHT AT ANY TIME TO MODIFY, DISCONTINUE, OR DELETE PORTIONS OF THESE TERMS AND CONDITIONS WITHOUT NOTICE. WE WILL POST CHANGES TO THESE TERMS AND CONDITIONS, IF ANY, TO THE SITE. IT IS YOUR RESPONSIBILITY TO CHECK THE SITE PERIODICALLY FOR CHANGES TO THE TERMS AND CONDITIONS. YOUR CONTINUED USE OF THE SITE, THE SERVICES AND/OR THE DENTAL MEMBERSHIP PLAN AFTER ANY CHANGES TO THESE TERMS AND CONDITIONS CONSTITUTES YOUR ACCEPTANCE OF THE REVISED TERMS AND CONDITIONS.
            </p>
            <p styleName="term__description">
              DENTALHQ DOES NOT OFFER OR PROVIDE A DENTAL MEMBERSHIP PLAN. WE PROVIDE A DIRECTORY OF DENTAL MEMBERSHIP PLANS OFFERED BY DENTISTS AND A PORTAL FOR YOU TO ENROLL IN AND PAY THE MEMBERSHIP FEE FOR A DENTAL MEMBERSHIP PLAN OFFERED BY A DENTIST OF YOUR CHOOSING.  DENTALHQ MAKES NO PAYMENT TO ANY DENTIST OFFERING A DENTAL MEMBERSHIP PLAN, WHETHER IN EXCHANGE FOR DENTAL SERVICES OR OTHERWISE. RATHER, WE PROCESS MEMBERSHIP FEE PAYMENTS FOR DENTISTS OFFERING DENTAL MEMBERSHIP PLANS THROUGH THE SITE.
            </p>
            <p styleName="term__description">
              THE DENTAL MEMBERSHIP PLAN IS NOT AN INSURANCE PLAN AND IS NOT INTENDED TO REPLACE DENTAL INSURANCE. THE DENTAL MEMBERSHIP PLAN IS NOT A QUALIFIED HEALTH DENTAL MEMBERSHIP PLAN UNDER THE AFFORDABLE CARE ACT OR A MEDICARE PRESCRIPTION DRUG DENTAL MEMBERSHIP PLAN. THE MEMBERSHIP FEE IS NOT AN INSURANCE PREMIUM. NEITHER THE DENTAL MEMBERSHIP PLAN, THE DENTIST OFFERING THE DENTAL MEMBERSHIP PLAN, NOR DENTALHQ ARE LICENSED INSURERS, HEALTH MAINTENANCE ORGANIZATIONS, OR OTHER UNDERWRITERS OF HEALTH CARE (DENTAL) SERVICES. NEITHER THE DENTAL MEMBERSHIP PLAN NOR DENTALHQ MAKE ANY PAYMENTS DIRECTLY TO DENTISTS FOR DENTAL SERVICES OR PAY ANY PORTION OF ANY DENTIST FEES. ENROLLMENT IN A DENTAL MEMBERSHIP PLAN AND PAYMENT OF THE MEMBERSHIP FEE ENTITLES YOU TO RECEIVE THE INCLUDED SERVICES, AS DEFINED IN SECTION 3 BELOW, AT A PREPAID, DISCOUNTED RATE. THE DENTAL MEMBERSHIP PLAN DOES NOT ENTITLE YOU TO ANY SERVICES THAT ARE NOT PART OF THE INCLUDED SERVICES, NOR DOES IT PAY FOR SUCH NON-INCLUDED SERVICES.
            </p>
            <p styleName="term__description">
              FOR NON-COVERED SERVICES, YOU WILL BE CHARGED DIRECTLY, AND REQUIRED TO PAY AT THE TIME OF TREATMENT FOR SUCH SERVICES. DENTISTS ARE SOLELY RESPONSIBLE FOR BILLING AND COLLECTING FROM YOU THE FEES WHICH THEY HAVE CHARGED FOR PROVIDING NON-COVERED SERVICES. NEITHER THE DENTAL MEMBERSHIP PLAN NOR DENTALHQ HAS ANY RESPONSIBILITY OR LIABILITY FOR BILLING OR COLLECTING DENTIST FEES. YOU MAY BE SUBJECT TO A DENTIST’S LATE PAYMENT FEE AND OTHER APPLICABLE OFFICE POLICIES. ANY DISPUTES OVER THE FEES CHARGED BY DENTISTS MUST BE ADDRESSED BY YOU DIRECTLY WITH THE DENTISTS.
            </p>
            <p styleName="term__description">
               YOUR SELECTION OF A DENTIST IS YOUR RESPONSIBILITY AND IS NOT BASED ON ANY REPRESENTATIONS MADE BY DENTALHQ. DENTISTS ARE INDEPENDENT CONTRACTORS AND ARE NEITHER EMPLOYEES NOR AGENTS OF DENTALHQ OR ITS AFFILIATES. DENTALHQ CANNOT GUARANTEE THE CONTINUED PARTICIPATION OF ANY DENTIST IN THE DENTAL MEMBERSHIP PLAN. DENTISTS ARE SUBJECT TO CHANGE WITHOUT NOTICE AND IF A DENTIST LEAVES THE DENTAL MEMBERSHIP PLAN, YOU WILL NEED TO SELECT ANOTHER DENTIST.
            </p>
            <p styleName="term__description">
              DENTALHQ DOES NOT, AND CANNOT, GUARANTEE THAT ANY PARTICULAR DENTIST WILL CONTINUE TO OFFER A DENTAL MEMBERSHIP PLAN FOR ANY PERIOD OF TIME.  YOUR DENTIST IS SOLELY RESPONSIBLE FOR THE PROFESSIONAL ADVICE, TREATMENT AND CARE, AS WELL AS THE OVERALL QUALITY AND OUTCOME, OF THE DENTAL SERVICES HE/SHE PROVIDES FOR YOU. NEITHER THE DENTAL MEMBERSHIP PLAN NOR DENTALHQ MAKE ANY REPRESENTATION, WARRANTY, OR GUARANTY REGARDING ANY ASPECTS OF THE DENTAL SERVICES, OR THE QUALITY OR OUTCOME OF SUCH SERVICES FURNISHED BY DENTISTS. NEITHER THE DENTAL MEMBERSHIP PLAN NOR DENTALHQ HAS ANY RESPONSIBILITY OR LIABILITY TO YOU WITH REGARD TO ANY OF THESE MATTERS, AND YOU MUST ADDRESS ALL OF THEM SOLELY WITH THE DENTISTS WHO TREATED YOU.
            </p>
            <p styleName="term__description">
              YOU ACKNOWLEDGE AND AGREE THAT DENTALHQ IS A PORTAL SERVICE THAT PROVIDES INDIVIDUAL PATIENTS WITH ACCESS TO A SEARCHABLE DIRECTORY OF INDEPENDENT DENTISTS WHO OFFER DENTAL MEMBERSHIP PLANS, AND A PLATFORM TO ENROLL IN AND PAY THE MEMBERSHIP FEE FOR THOSE DENTAL MEMBERSHIP PLANS THROUGH THE SITE. YOU FURTHER ACKNOWLEDGE AND AGREE THAT DENTALHQ IS NOT LICENSED TO, AND DOES NOT, PROVIDE DENTAL SERVICES OF ANY KIND. ACCORDINGLY, YOU, FOR YOURSELF AND FOR EACH OF YOUR FAMILY MEMBERS THAT YOU ENROLL IN A DENTAL MEMBERSHIP PLAN THROUGH THE SITE, AS THE CASE MAY BE, HEREBY FOREVER RELEASE AND DISCHARGE DENTALHQ AND ITS OFFICERS, DIRECTORS, MEMBERS, AGENTS, EMPLOYEES, AND AFFILIATES FROM ANY AND ALL LIABILITIES, CLAIMS, DEMANDS, ACTIONS AND CAUSES OF ACTION, WHATSOEVER, THAT YOU OR SUCH FAMILY MEMBER MAY HAVE BY REASON OF ANY DAMAGE OR PERSONAL INJURY SUSTAINED AS A RESULT OF OR IN CONNECTION WITH ANY DENTAL SERVICES PROVIDED TO YOU OR YOUR FAMILY MEMBER BY A DENTIST. YOUR SOLE RECOURSE AGAINST DENTALHQ SHALL BE CANCELLATION OF YOUR ENROLLMENT IN THE DENTAL MEMBERSHIP PLAN THAT YOU HAVE CHOSEN.  IF YOU CANCEL YOUR ENROLLMENT IN THE DENTAL MEMBERSHIP WITHIN THE NINETY (90) DAYS FOLLOWING YOUR INITIAL ENROLLMENT, YOU WILL BE ELIGIBLE FOR A FULL REFUND SUBJECT TO THE TERMS OF SECTION 5 AND SECTION 6, BELOW.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              1. ACCOUNT SIGN UP.
            </h4>
            <p styleName="term__description">
              To enroll in a Dental Membership Plan using the Site, you must open an account (the "<u>Account</u>"). You represent that all information you provide during the Account sign up process and at any time thereafter for you and all family members for which you establish an account ("<u>Account Information</u>"), will be true, accurate, complete, and current and that you will promptly update your Account Information as necessary such that it is, at all times, true, accurate, complete, and current. If your Account includes any information for other family members, you will ensure that their Account Information is accurate. We will use all Account Information, subject to compliance with the <a href="/privacy" target="_blank">DentalHQ Privacy Policy (https://www.dentalhq.com/privacy)</a> The Agreement incorporate the terms and conditions set forth in the DentalHQ Privacy Policy, and by accessing the Site and or participating in the Dental Membership Plan, you are consenting to have your personal data and the personal data of your family members used by us as set forth in the DentalHQ Privacy Policy. You alone are responsible for maintaining the security of your Account Information and for the use of your Account.
            </p>
            <p styleName="term__description">
              You may enroll minors in the Dental Membership Plan, provided that you are the legal parent or guardian for each individual. To enroll yourself or others for which you are the legal parent or guardian, you must be 18 years or older and must have an eligible payment method registered with DentalHQ. You can change the payment method on file at any time. You will receive an email confirmation when your method of payment is charged. Please contact us immediately if you do not recognize charges on your email confirmation.
            </p>
            <p styleName="term__description">
              Use of the Site requires compatible devices, Internet access, and certain software; and may be affected by the performance of these factors. You agree that meeting these requirements, which may change from time to time, is your responsibility. We do not represent or guarantee you will be able to access the Site at all times.
            </p>
            <p styleName="term__description">
              The owner of the Account should not reveal the applicable Account information to anyone else, and is solely responsible for maintaining the confidentiality and security of the Account and for all activities that occur on or through the Account. In order to create a personal account, an individual must enter their name and email address and create a password. To access the Account, the email address and password will be required.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              2. ENROLLMENT AND FEES.
            </h4>
            <p styleName="term__description">
              You may enroll on a month to month basis, in which case your monthly Membership Fee will be due monthly in advance or you may enroll for a one (1)-year term in which case the annual Membership Fee will be paid in advance. For both the monthly memberships and the annual membership, we will bill your credit card accordingly.  For monthly memberships, your Dental Membership Plan membership will be automatically renewed at the end of each month, on a month to month basis, and your credit card will be automatically charged the monthly Membership Fee as described above, unless you cancel your enrollment in the Dental Membership Plan as provided below.
            </p>
            <p styleName="term__description">
              For annual memberships, you will receive an email not less than thirty (30) days prior to the end of the then-current annual period, which will provide instructions for you to renew your membership. Should you elect to renew your membership for the next annual period, your credit card will be charged the then-current annual Membership Fee for the Dental Membership Plan you have selected. We use a third party payment processor to collect and process all payments. In order to make payments you may be required to agree to the third party terms and conditions and/or Privacy Policy.
            </p>
            <p styleName="term__description">
              Your renewal and payment must be received prior to the expiration date of the then current term in order to avoid interruption of your membership in the Dental Membership Plan.
            </p>
            <p styleName="term__description">
              Your Dentist may increase the monthly and/or annual Membership Fee of the Dental Membership Plan from time to time. You will receive an email notification of any such increase in fees no less than thirty (30) days before the new rate becomes effective. By establishing an Account and enrolling in a Dental Membership Plan through the Site, you hereby authorize DentalHQ to bill for the monthly Membership Fee or annual Membership Fee, as set forth in this agreement. If your credit card or billing information changes, it is your responsibility to provide updated information to us on a timely basis.
            </p>
            <p styleName="term__description">
              You agree that DentalHQ may process payment for all fees associated with the Dental Membership Plan that you choose using the payment method (e.g., credit card, debit card, PayPal account, etc.) that you have provided in your Account Information. You are responsible for the timely payment of all fees pursuant to the fee scheduled you elect at the time of enrollment. It is your responsibility to notify us if your payment method has changed by making the appropriate changes to your account settings. If you do not provide a valid payment method, or if your designated payment method is determined by us to be inactive for any reason, your Dentist may immediately discontinue your enrollment in the Dental Membership Plan.
            </p>
            <p styleName="term__description">
              You agree not to cause your credit or debit card company to reverse or "chargeback" any fees charged in accordance with these Agreement; and in the event you do so, we may terminate your enrollment in the Dental Membership Plan, and you agree to reimburse us for any costs incurred in responding to such chargeback, including, without limitation, our actual costs paid to the credit or debit card company, including chargeback fees, and the value of the time our employees spend on the matter as determined in our discretion in good faith.
            </p>
            <p styleName="term__description">
              For planning purposes, your DENTALHQ Account dashboard will include real-time data with respect to your enrollment information, including the beginning of the current enrollment period and a history of your payments received by us.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              3. THE DENTAL MEMBERSHIP PLAN.
            </h4>

            <p styleName="term__description">
              The Dental Membership Plan is a prepaid discount membership program for dental services. It is being offered by the Dentist you have chosen. Certain Dentists have contracted with DentalHQ to offer enrollment in their independent dental membership plans through DentalHQ. These Dental Membership Plans provide a set of specified dental services ("Covered Services") to you for no out-of-pocket fees other than the cost of the Dental Membership Plan. These Covered Services are described below, and are provided in exchange for the cost of the Membership Fee, which reflects a percentage off the Dentists’ current rates for such dental services. Other services may be provided by your Dentist at discounted rates ("Additional Services") pursuant your Dentist’s fee schedule ("Fee Schedule"). In most cases, the discounted fees are provided at predetermined rates and at a percentage off the Dentists’ current rates for such designated dental services.
            </p>
            <p styleName="term__description">
              DentalHQ does not determine the rates for Covered Services, Additional Services, non-covered services, or the Dental Membership Plan offered by your Dentist.
            </p>
            <p styleName="term__description">
              DentalHQ does not pay your Dentist for the services you receive, but rather processes payments for your Dental Membership Plan on behalf of your Dentist. The Dental Membership Plan is a loyalty program between you and your Dentist. By enrolling in the Dental Membership Plan and making your required payments under the plan, you become eligible to receive the Covered Services from a Dentist of your choosing. These Covered Services are described below.
            </p>

            <h5 styleName="term__subtitle">
              Covered Services
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
              In addition to and without limiting the other terms and conditions contained herein, the following terms and conditions also apply to your Dental Membership Plan: 
            </p>

            <ul>
              <li>
                You must be current on all Membership Fees for your Dental Membership Plan in order to receive any Covered Services or Additional Services;
              </li>
              <li>
                You may not combine your Dental Membership Plan with any other discounts, discount plans, dental insurance (including Medicare, Medicaid, other forms of government insurance or assistance, and/or any private insurance plan or policy) or in-office promotions;
              </li>
              <li>
                It is possible that, during the course of treatment by your Dentist, he or she may discover a dental or health condition that may require further treatment—the costs associated with any further treatment are your responsibility and are not covered under the Dental Membership Plan;
              </li>
              <li>
                Discounts provided under the Dental Membership Plan apply only to services provided by your Dentist, and not products that your Dentist may sell; and
              </li>
              <li>
                Any late fees or missed-appointment fees that your Dentist may charge will still apply and will be your responsibility and are not covered under the Dental Membership Plan. You should contact your Dentist regarding any no show penalties before scheduling an appointment.
              </li>
              <li>
                <a href="http://www.nidcr.nih.gov/oralhealth/Topics/GumDiseases/PeriodontalGumDisease.htm" target="_blank">Periodontal disease</a>, also known as gum disease, can range from relatively-minor gum inflammation to much more serious forms of disease that can damage the soft tissue and bone that support the teeth.  If your Dentist determines that you have periodontal disease, he or she may recommend additional treatment before you are able to have a regular cleaning.  If you do have periodontal disease and require additional treatment, you will be responsible for the costs associated with that treatment.
              </li>
            </ul>

            <p styleName="term__description">
              To use the Dental Membership Plan, simply contact the Dentist of your choice, identify yourself as an member of  their Dental Membership Plan, and schedule your appointment. You will not be charged for the Covered Services other than the payment of your Membership Fee. You are obligated to pay the Dentist directly for any non-covered services that the Dentist provides to you, including any sales or use taxes imposed upon the services, in accordance with the Dentist’s payment policies.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              4. LIMITATIONS.
            </h4>
            <p styleName="term__description">
              Not all dental services are Covered Services under the Dental Membership Plan. Only those specifically listed as Covered Services are provided by your Dentist at no additional charge to you.  DentalHQ reserves the right to change, modify or make substitutions in the Dentist List at any time, and from time to time, without notice. Such changes will be reflected on the Site from time to time. If you require any dental services that are not Covered Services, Dentists have agreed to charge you a discount to the current rates that they charge their other patients for providing such non-Covered Services. You must consult with the Dentist for his/her fee schedule for such non-Covered Services. DentalHQ will endeavor to keep the Dentist List up to date such that only participating active Dentists are listed on the Site. DentalHQ strongly recommends that you confirm that a Dentist is currently a Dentist before you receive any services from that Dentist. By enrolling in the Dental Membership Plan, You hereby give permission to DentalHQ and its affiliates to market and offer services to you that are unrelated to the Dental Membership Plan.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              5. CANCELLATION AND RE-ENROLLMENT.
            </h4>
            <p styleName="term__description">
              You have the right to cancel your enrollment in the Dental Membership Plan at any time. Note that, during the first ninety (90) days following your enrollment, you must cancel your enrollment by contacting your Dentist. After you have been enrolled for ninety (90) days, you may cancel your enrollment by email using your personal dashboard on the Site or by certified mail, return receipt requested, to the address provided in Section 13 below. Cancellations over the telephone cannot be accepted.
            </p>
            <p styleName="term__description">
              Your Dentist may terminate your enrollment in the Dental Membership Plan at any time for any reason, including for the non-payment of your Membership Fee, or for no reason. If your Dentist terminates your enrollment for a reason other than the non-payment of your Membership Fee, then your Dentist will give you a pro-rated refund of your Membership Fee. For example, if your Dentist terminates an annual enrollment at the end of six months during an annual period—for any reason other than non-payment of the Membership Fee—the member would be entitled to receive a refund of one half of the member’s pre-paid Membership Fee for that one (1)-year period.
            </p>
            <p styleName="term__description">
              If a payment is not received when due, your Account will be placed into "late" status for a period of thirty (21) days. If payment has not been received prior to the end of the thirty (21)-day period, your Account and your enrollment in the Dental Membership Plan will become "inactive" and you will no longer be provided with dental services under the Dental Membership Plan. Likewise, if you cancel your enrollment after the date ninety (90) days after your date of initial enrollment, your enrollment will become inactive. If your account is inactive, then to re-enroll in the Dental Membership Plan you will be charged a ninety-nine dollar ($99.00) re-enrollment fee in addition to any monthly or annual Membership Fees due.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              6. REFUND POLICY.
            </h4>

            <p styleName="term__description">
              We do not provide refunds to any payments made for the Dental Membership Plan except for the following three situations:
            </p>

            <ol type="A">
              <li>
                <u>Member Cancellation during the initial ninety (90) day period.</u> If you cancel your membership during the initial ninety days following your enrollment (whether such payment is a monthly payment or an annual payment) we will provide, on behalf of your Dental Membership Plan, a full refund of your paid Membership Fees. <strong>Notwithstanding the foregoing, if you have received any dental services under your Dental Membership Plan within the first ninety (90) and cancel your membership in the Dental Membership Plan after receiving those services, your Dentist will bill you for the services rendered to you at your Dentists’ then current rates. Payment in full for any services rendered by your Dentist during this period will be required prior to the issuance of a Refund.</strong>
              </li>
              <li>
                <u>Billing error.</u> In order to be considered a "billing error" you must provide sufficient written documentation to demonstrate the existence of a billing error and adequate proof of the amount paid due to such error.
              </li>
              <li>
                <u>Dental Membership Plan Termination.</u> If your Dentist terminates your enrollment in a Dental Membership Plan without your consent or permission, or ceases offering a Dental Membership Plan, your Dentist will provide a pro rata refund.
              </li>
            </ol>

            <p styleName="term__description">
              <strong>Refunds must be requested by email sent to <a href="mailto:info@dentalhq.com">info@dentalhq.com</a> or by certified mail, return receipt requested, to the address provided in Section 13 below. Except as set forth above, we do not provide a refund of payments made.</strong>
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              7. COMPLAINTS.
            </h4>
            <p styleName="term__description">
              If you have any complaints about the Site or any matters related to billing for the Membership Fee, you can submit the complaint by email using the Site or by certified mail, return receipt requested, to the address provided in Section 13 below. Complaints over the telephone cannot be accepted. DentalHQ will make every reasonable effort to respond to your complaint, either by email or regular mail, within fourteen (14) days after it is received. If your complaint is about the dental services provided by a Dentist, the fees you were charged, or any other dissatisfaction with a Dentist, all such complaints must be addressed directly with the Dentist.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              8. LIMITATION OF LIABILITY.
            </h4>
            <p styleName="term__description">
              IN NO EVENT WILL WE BE LIABLE TO YOU OR ANY THIRD PERSON FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING DAMAGES FOR ANY LOST PROFITS ARISING FROM YOUR PARTICIPATION IN THE DENTAL MEMBERSHIP PLAN, EVEN IF WE ARE AWARE OR HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ANY WARRANTIES FOR SERVICES THAT YOU RECEIVE FROM A DENTIST. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF: (A) THE ADMINISTRATIVE PORTION OF THE MOST RECENT MEMBERSHIP FEE WE HAVE PROCESSED ON YOUR BEHALF; OR (B) TEN DOLLARS ($10). CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              9. INDEMNITY.
            </h4>
            <p styleName="term__description">
              You agree to indemnify and hold us and our directors, officers, agents, contractors, affiliates, partners and employees, harmless from and against any loss, liability, claim, or demand, including reasonable attorneys’ fees, arising out of any claim, action, investigation or proceeding made or instituted by any third party due to or arising out of your participation in the Dental Membership Plan.
            </p>
            <p styleName="term__description">
              You hereby agree not to sue, assist in or be a voluntary party to assist in or be a voluntary party to, except as required by law, any action, suit, or proceeding against us for any claims, actions, suits, damages, liability, losses or expenses of whatever kind or however arising out your participation in the Dental Membership Plan.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              10. LINKS TO OTHER WEBSITES.
            </h4>
            <p styleName="term__description">
              The Site may contain links to other web sites. We are not responsible for the content, accuracy or opinions expressed on such web sites, and such web sites are not investigated, monitored or checked for accuracy or completeness by us. Inclusion of any linked web site on or through the Site does not imply approval or endorsement of the linked web site by us. If you decide to leave the Site and access these third-party sites, you do so at your own risk.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              11. GOVERNING LAW; ARBITRATION.
            </h4>
            <p styleName="term__description">
              The Agreement shall be governed by and construed in accordance with the laws of the State of North Carolina, without reference to conflicts of laws provisions and, as to matters affecting copyrights, trademarks and patents, by U.S. federal law. Any dispute or claim arising out of, or in connection with, this Agreement shall be finally settled by binding arbitration in Raleigh, North Carolina, in accordance with N.C. Gen. Stat. § 1-569.1 et seq. (the "Uniform Arbitration Act") and the then-current rules and procedures of the American Arbitration Association by one (1) arbitrator appointed by the American Arbitration Association. The arbitrator shall apply the law of the State of North Carolina, without reference to rules of conflict of law or statutory rules of arbitration, to the merits of any dispute or claim. Judgment on the award rendered by the arbitrator may be confirmed, reduced to judgment and entered in any court of competent jurisdiction. You agree that, any provision of applicable law notwithstanding, the arbitrator shall have the authority to award the prevailing party its costs and reasonable attorneys’ fees. In the event that the above arbitration provision is held invalid or unenforceable, then any dispute with respect to the Agreement shall be brought and heard either in the North Carolina state courts located in Raleigh, North Carolina, or the federal district court located in Raleigh, North Carolina. In such event, you consent to the in personam jurisdiction and venue of such courts. You agree that service of process upon you in any such action may be made if delivered in person, by courier service, by telefacsimile or by first class mail, and shall be deemed effectively given upon receipt.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              12. USER PROVIDED CONTENT.
            </h4>
            <p styleName="term__description">
              At times, you may be allowed to post reviews of Dentists and other content on the Site (collectively, "Contributions"). You agree not to create any Contribution that:
            </p>

            <ul>
              <li>
                Contains vulgar, profane, abusive, hateful, or sexually explicit language, epithets or slurs, text in poor taste, inflammatory attacks of a personal, sexual, racial or religious nature, or expressions of bigotry, racism, discrimination or hate;
              </li>
              <li>
                Is defamatory, threatening, disparaging, false, misleading, deceptive, fraudulent, inaccurate, or unfair, contains gross exaggeration or unsubstantiated claims, violates the privacy rights or right of publicity of any third party, is unreasonably harmful or offensive to any individual or community, contains any actionable statement, or tends to mislead or reflect unfairly on any other person, business or entity;
              </li>
              <li>
                Contains copyrighted content (copyrighted articles, illustrations, images, text, or other content) without the express permission of the owner of the copyrights in the content;
              </li>
              <li>
                Constitutes, promotes or encourages illegal acts, the violation of any right of any individual or entity, the violation of any local, state, national or international law, rule, guideline or regulation, or otherwise creates liability;
              </li>
              <li>
                Discloses any personal identifying information relating to or images of a minor;
              </li>
              <li>
                Infringes any copyright, trademark, patent, trade secret, or other intellectual property right;
              </li>
              <li>
                Contains viruses or other harmful, disruptive or destructive files;
              </li>
              <li>
                Links to any commercial or other website; and/or
              </li>
              <li>
                Is not otherwise in compliance with this Agreement.
              </li>
            </ul>

            <p styleName="term__description">
              Each time you provide a Contribution to the Site, you represent and warrant that you have the right to provide such Contribution, which means: (i) you are the author of the Contribution, or the Contribution is not protected by copyright law, or you have express permission from the copyright owner to use the Contribution in connection with the Site and all Services; (ii) you have the right to grant us the license set out in this Agreement; (iii) your Contribution(s) do not violate this Agreement.
            </p>
            <p styleName="term__description">
              You grant us and our affiliates and related entities a royalty-free, perpetual, irrevocable, non-exclusive right and license to use, copy, modify, display, archive, store, publish, transmit, perform, distribute, reproduce and create derivative works from all Contributions you provide to us in any form, media, software or technology of any kind now existing or developed in the future. Without limiting the generality of the previous sentence, you authorize us to include the Contributions you provide in a searchable format that may be accessed by users of the Site. You also grant us and our related entities the right to use any PII (as that term is defined in our Privacy Policy) included with any Contribution in connection with the use, reproduction or distribution of such Contribution and our provision of Services to you. You grant all rights described in this Section in consideration of your use of the Site, without compensation of any sort to you.
            </p>
            <p styleName="term__description">
              Contributions are not endorsed by us, and do not represent the views of us or our subsidiaries and affiliates, agents, officers or directors. You acknowledge and agree that we do not control Contributions, and disclaim any responsibility for Contributions. We specifically disclaim any duty, obligation, or responsibility, to review, screen, refuse to post, remove, or edit any Contribution. In addition, we do not represent or warrant that any other content or information accessible via the Site is accurate, complete, reliable, current or error-free. We assume no responsibility or liability for any errors or omissions in the content provided via the Site. We reserve the right (but disclaim any duty, obligation or responsibility) to review, screen, refuse to post, remove in their entirety, or edit (at any time and without prior notice) any Contribution for any reason or no reason whatsoever, in our absolute and sole discretion.
            </p>
          </div>

          <div styleName="term">
            <h4 styleName="term__title">
              13. MISCELLANEOUS.
            </h4>
            <p styleName="term__description">
              The Agreement set forth the entire agreement between you and us pertaining to your participation in the Dental Membership Plan and your use of the Site. If any provision of this Agreement is held invalid or unenforceable, such provision shall be revised to the extent necessary to cure the invalidity or unenforceability, and the remainder of this Agreement shall continue in full force and effect. Our failure to exercise any right or provision of this Agreement shall not constitute a waiver of such right or provision. Nothing in these Agreement shall be deemed to confer any third-party rights or benefits. Our delay or failure to exercise any right or provision of these Agreement shall not constitute a waiver of such right or provision. These Agreement do not, and shall not be deemed to, constitute a partnership or joint venture between you and us, and neither you nor DentalHQ has the authority to bind the other under any contract, agreement, or otherwise. We shall not be liable for any failure to perform any of our obligations under these Agreement if the performance is prevented, hindered or delayed due to any cause beyond the reasonable control of DentalHQ including, without limitation, unavailability of any communication system, breach or virus in the processes, sabotage, fire, flood, explosion, acts of nature, civil commotion, riots, insurrection, war, acts of government, etc.
            </p>
            <p styleName="term__description">
              Enrollment and membership in the Dental Membership Plan is for your own personal benefit and may not be assigned or delegated by you to any other person. Your violation of this provision, in the discretion of DentalHQ, may result in immediate termination of your Dental Membership Plan membership for cause.
            </p>
            <p styleName="term__description">
              Should you have any questions regarding your enrollment in or use of a Dental Membership Plan, please call us at (919) 825-1239 between the hours of 10:00 AM and 5:00 PM Monday through Friday.  Or email: <a href="mailto:info@dentalhq.com">info@dentalhq.com</a>.  Any written notices or inquiries should be addressed to DentalHQ as follows:
            </p>
            <p styleName="term__description">
              Customer Relations
              <br />
              310 S. Harrington St.
              <br />
              Raleigh, NC 27603
            </p>
            <p styleName="term__description">
              Any notices provided by DentalHQ to the members of any Dental Membership Plan offered by a Dentist through the Site may be given by posting on the Site. It is your responsibility to periodically check the Site for such notice(s).
            </p>
          </div>

        </div>
      </div>

    );
  }
}

export default TermsPage;
