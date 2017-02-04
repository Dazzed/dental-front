import React from 'react';
import CSSModules from 'react-css-modules';

import PageHeader from 'components/PageHeader';
import styles from './index.css';

@CSSModules(styles)
export default class FaqPage extends React.Component {
  render () {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Privacy" />

        <div className="container">
          <div className="col-md-12">

            <div styleName="term">
              <h4 styleName="term__title">Revised Date: November, 2016</h4>
              <div styleName="term__description">
                <p>
                  Welcome to the website dentalhq.com (the "Site"). The related platforms, products, and services available on or from the Site (the "Services") are owned and operated by DentalHQ, LLC (hereinafter referred to as "our", "we", "us", or "DentalHQ").
                </p>
                <p>
                  DentalHQ cares about online privacy and wants you to know how we collect, use and share and protect information about you and the choices you have regarding our use of your information. If you have any questions concerning this Privacy Policy, please email us at <a href="mailto:customersupport@dentalhq.com">customersupport@dentalhq.com</a>. We may change or add to this Privacy Policy from time-to-time, so we encourage you to review it periodically.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">SCOPE</h4>
              <div styleName="term__description">
                <p>
                  This Privacy Policy applies to the collection of personal information from users of the Services, including any updated and new products or services that may be offered in the future by DentalHQ. It relates to information we collect from you, including personally identifying information (also referred to as "PII") and information that does not identify you personally. PII may include, for example, some or all of the following: your name, mailing address, email address, telephone number, mobile phone number, passwords, credit/debit card information, user name and password. This Privacy Policy is incorporated into and subject to our Terms and Conditions that apply to use of this Site. By using the Services and this Site, you consent to our Terms and Conditions and Privacy Policy, including our use and disclosure of your personal information as stated in this Privacy Policy, whether or not you sign up for an account with us.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">INFORMATION COLLECTED AND USED BY DENTALHQ</h4>
              <div styleName="term__description">
                <p>
                  When users sign up for an account, DentalHQ collects user submitted information such as name, mailing address, telephone number and email address. DentalHQ uses that information to authenticate users and to send notifications to users relating to, without limitation, the Services and other opportunities.
                </p>
                <p>
                  As is standard practice, DentalHQ also logs non-personally-identifiable information, including IP address, profile information, aggregate user data, and browser type, from the Site. This data is used to improve the Site services, to analyze trends, to administer the Site, to track users movements around the Site and to gather demographic information about our user base as a whole. DentalHQ will not use the information collected to market directly to that user. User IP addresses are recorded for security and monitoring purposes.
                </p>
                <p>
                  In addition, DentalHQ uses pixel tags - tiny graphic images - to tell us what parts of the Site have been visited or to measure the effectiveness of searches users perform on the Site. Pixel tags also enable us to send email messages in a format that users can read. And they tell us whether emails have been opened to assure that we are only sending messages that are of interest to our users.
                </p>
                <p>
                  DentalHQ may also use a user’s email address to send updates, a newsletter or news regarding the Services. DentalHQ may send email messages which use a "click-through URL" linked to content on the Site. When a user clicks one of these URLs, they pass through our web server before arriving at the destination web page. DentalHQ tracks this click-through data to help determine interest in particular topics and measure the effectiveness of our customer communications. If you prefer not to be tracked simply avoid clicking text or graphic links in the email. Users who no longer wish to receive promotional messages or updates may choose not to by opting-out. To opt-out, click on “unsubscribe” from the email (if available) or reply with the word “unsubscribe” in the subject line of the email. You can also forward the email to <a href="mailto:customersupport@dentalhq.com">customersupport@dentalhq.com</a> with the same “unsubscribe” message. All notification emails and DentalHQ newsletters also include the above instructions for opting-out of those communications in the future. Note that users who have opted-out of promotional messages or updates may still receive email messages from DentalHQ where necessary to provide a Service you have requested or where necessary to inform you of critical information relating to your use of the Site.
                </p>
                <p>
                  We use the information that we collect to develop, deliver, and improve our products, Services, and other offerings. In cases where you use a mobile device to access the Site and use the Services, we may receive information about the location of your device. We may use this information to develop, deliver, and improve our products, Services, and other offerings.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">USE OF COOKIES</h4>
              <div styleName="term__description">
                <p>
                  DentalHQ uses cookies to store users preferences and to record session information, for purposes including: (i) to customize Site content based on browser type and user profile information; (ii) to help track usage to help us understand which parts of the Site are most popular, where our visitors are going, and how much time they spend there; (iii) to make usage of our Site even more rewarding as well as to study the effectiveness of our user communications, and (iv) to customize each visitor's experience and provide greater convenience. 
                </p>
                <p>
                  The cookies may reflect de-identified demographic or other data linked to data you voluntarily have submitted to us, e.g., your email address. You may be able to configure your browser to accept or reject all or some cookies, or notify you when a cookie is set -- each browser is different, so check the "Help" menu of your browser to learn how to change your cookie preferences -- however, you must enable cookies from DentalHQ in order to use most functions on the Site.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">LINKS</h4>
              <div styleName="term__description">
                <p>
                  This Site may contain links to third party websites. DentalHQ is not responsible for the privacy policies and/or practices on other sites. When linking to another site, a user should read the privacy policy stated on that site. Our Privacy Policy only governs information collected on the Site.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">CORRECTING/UPDATING OR REMOVING INFORMATION</h4>
              <div styleName="term__description">
                <p>
                  DentalHQ users may modify or remove any of the information contained in their account profile at any time by logging into their account and accessing features such as EditProfile and Account Settings. If a user does not have that capacity because someone purchased DentalHQ on their behalf, they must contact the account owner to request deletion of their account.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">SECURITY</h4>
              <div styleName="term__description">
                <p>
                  DentalHQ user accounts are secured by user-created passwords. DentalHQ takes precautions to ensure that account information is kept private. DentalHQ uses reasonable measures such as encryption to protect private information that is stored within our database against loss, theft, and misuse, as well as unauthorized access, disclosure, alteration, and destruction, and we restrict access to such private information to those employees who need access to perform their job functions, such as our customer service personnel and technical staff. Among these measures, when you enter sensitive information (such as a credit card number) on our order forms, we encrypt the transmission of that information using secure socket layer (SSL) technology, which creates an encrypted connection between you and our systems. Once we collect your credit card or debit card information, it is stored encrypted on restricted-access computers that are not directly accessible via the Internet. Please note that no method of electronic transmission or storage is 100% secure, however, and DentalHQ cannot guarantee the security of user account information. Unauthorized entry or use, hardware or software failure, and other factors may compromise the security of member information at any time. Users are urged to also take precautions to protect their personal data by changing passwords often using a combination of letters and numbers, and using a secure web browser. For any additional information about the security measures DentalHQ uses on the Site, please contact us at <a href="mailto:customersupport@dentalhq.com">customersupport@dentalhq.com</a>.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">SHARING AND DISCLOSURE OF INFORMATION DENTALHQ COLLECTS</h4>
              <div styleName="term__description">
                <p>
                  Except as otherwise described in this Privacy Policy, DentalHQ will not disclose personal information to any third party unless it believes that disclosure is necessary: (1) to conform to legal requirements or to respond to a subpoena, search warrant or other legal process received by DentalHQ, whether or not a response is required by applicable law; (2) to enforce the General Terms and Conditions or to protect our rights; or (3) to protect the safety of members of the public and users of the Services. DentalHQ reserves the right to transfer personal information to a successor in interest that acquires rights to that information as a result of the sale of DentalHQ or substantially all of its assets to that successor in interest. DentalHQ takes your privacy very seriously. DentalHQ does not sell or rent your contact information to other marketers. To help us provide superior service, your personal information may be shared internally within DentalHQ. There are also times when DentalHQ may make certain personal information about you available to companies that DentalHQ has a strategic relationship with or that perform work for DentalHQ to provide products and services to you on our behalf. For example, these companies may help us process information, deliver products to you, manage and enhance customer data, provide customer service, assess your interest in our products and services, or conduct customer research or satisfaction surveys. These companies are also obligated to protect your personal information in accordance with DentalHQ’s policies. Without such information being made available, it may be difficult for you to purchase products or Services, have products or Services delivered to you, receive customer service, provide us feedback to improve our products and services, or access certain services, offers, and content on the Site.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">PRIVACY OF CHILDREN</h4>
              <div styleName="term__description">
                <p>
                  This Site and our Services are oriented toward a general audience and intended for adults only. We do not knowingly collect personally identifiable information from those under the age of thirteen (13). If you believe that we have inadvertently collected personally identifiable information from a person under thirteen (13), please contact us so that we can investigate and take any necessary remedial measures.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">CHANGES IN OUR PRIVACY POLICY</h4>
              <div styleName="term__description">
                <p>
                  From time to time DentalHQ may make changes to its Privacy Policy. The most recent version of the Privacy Policy will be posted on the Site, with the "Revised Date" posted at the top of the Policy. If we make any material changes to our Privacy Policy or how we handle your personal information, you will know because the Revised Date of the Privacy Policy will change. If we make a significant or material change in the way we use your PII, we will post a more prominent notice (including, for certain services, email notification of Privacy Policy changes where possible) in advance of any such change for thirty (30) days where feasible. A user is bound by any changes to the Privacy Policy upon use of the Site after those changes have been posted.
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">CONTACTING US</h4>
              <div styleName="term__description">
                <p>
                  If you have any questions about this Privacy Policy, the practices of this Site, or your dealings with this Site, please contact us at: <a href="mailto:customersupport@dentalhq.com">customersupport@dentalhq.com</a>. Physical inquiries can be sent to the following address: 
                </p>
                <p>
                  DentalHQ, Inc. <br/>
                  Attn: Legal Department - Privacy <br/>
                  710 Independence Place, #706 Raleigh, NC 27603 <br/>
                </p>
              </div>
            </div>

            <div styleName="term">
              <h4 styleName="term__title">DISPUTES</h4>
              <div styleName="term__description">
                <p>
                  Any disputes regarding this Privacy Policy are subject to our Terms and Conditions and will be governed by the laws of the State of North Carolina, applicable to agreements made and performed there.
                </p>
                <br/>
                <p>
                  © 2016 DentalHQ, Inc.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
