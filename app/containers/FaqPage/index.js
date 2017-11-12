/*
FAQ Page
================================================================================
Route: `/faq`
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';

// app
import PageHeader from 'components/PageHeader';

// local
import QuestionAndAnswer from './QuestionAndAnswer';
import styles from './index.css';

/*
Q&A Content
------------------------------------------------------------
*/
/* eslint-disable */
const QuestionAndAnswers = [
  {
    no: 1,
    question:
      'What is Periodontal Disease (also referred to as Gum Disease)? What happens if my Dentist determines that I have Periodontal Disease?',
    answer: (
      <div>
        <p>
          Periodontal disease or Gum disease is an infection of the tissues that
          surround and support your teeth. It is present in roughly 10 percent
          of adults. It is a major cause of tooth loss in adults. Because gum
          disease is usually painless, you may not know you have it.

          For more information:{' '}
          <a target="_blank"
             rel="noopener noreferrer"
             href="https://www.perio.org/consumer/types-gum-disease.html"
          >
            https://www.perio.org/consumer/types-gum-disease.html
          </a>
        </p>

        <p>
          If you’re dentist determines that you have Periodontal Disease he will
          recommend a treatment known as Scaling and Root planning or commonly
          referred to as a "Deep Cleaning". This treatment involves
          anesthetizing your gums so that you are comfortable and then using
          instruments to remove the hardened tarter and bacteria from below your
          gum line. This treatment will need to be completed prior to your
          routine cleaning. The costs for this treatment
          is <strong>not</strong> included in your membership.
        </p>
      </div>
    )
  },

  {
    no: 2,
    question: 'What is an In-House membership plan?',
    answer: (
      <p>
        Your membership is a loyalty plan being offered by your dental provider.
        It is essentially a package of services being offered at a set monthly
        or annual recurring price. Your dentist sets the pricing and all
        payments go directly to them.  Regular preventative dental appointments
        promote oral health which is vital to your overall health. Your dentist
        has created this membership plan to include your basic annual preventive
        needs at a discount and broken down into affordable monthly payments.
        This membership plan is between you and your dentist.  DentalHQ simply
        processes the plan that your dentist offers. <strong>THIS IS NOT
        INSURANCE.</strong>
      </p>
    )
  },

  {
    no: 3,
    question: 'When will I be billed?',
    answer: (
      <p>
        If you signed up for a MONTHLY membership plan your recurring payment
        will be billed on the same date each month. If you signed up on the
        29th, 30th, or 31st of the month and that day doesn’t exist in the
        following months then you will be billed on the last day of the
        following month.
      </p>
    )
  },

  {
    no: 4,
    question: 'What happens if I cancel my membership?',
    answer: (
      <div>
        <p>
          FOR MONTHLY MEMBERSHIPS: You may cancel your membership after <strong>90 days</strong>.
          After 90 days you may cancel directly through your dashboard or you
          may cancel your membership by contacting your dental office and asking
          them to cancel your membership. If you chose to cancel your membership
          your package of services will still be available until the end of your
          renewal cycle.
        </p>

        <p>
          FOR ANNUAL MEMBERSHIPS: While you may cancel your recurring payment at
          anytime, your membership package of services are available until your
          membership expires.
        </p>
      </div>
    )
  },

  {
    no: 5,
    question: 'What happens if I cancel my membership and decide to re-enroll?',
    answer: (
      <div>
        <p>
          FOR MONTHLY MEMBERSHIPS ONLY: Re-enrollment into a monthly membership
          plan is subject to a $99 re-enrollment fee. This may be waived by your
          dentist at their discretion.
        </p>

        <ul className={styles['details']}>
          <li>
            If you re-enroll into an annual membership from a monthly membership
            then NO re-enrollment fee will apply.
          </li>

          <li>
            If you re-enroll into a monthly membership from an annual membership
            then NO re-enrollment fee will apply.
          </li>

          <li>
            If you re-enroll from and annual membership into an annual
            membership then NO re-enrollment fee will apply.
          </li>
        </ul>
      </div>
    )
  },

  {
    no: 6,
    question: 'How long is my membership active?',
    answer: (
      <div>
        <p>
          FOR MONTHLY MEMBERSHIPS: You are eligible for the services included in
          your membership for one (1) month after your most recent payment. If
          payment is delinquent by 21 days or more, your account will
          automatically become inactive and re-enrollment fees may apply.
        </p>

        <p>
          If your payment fails to go through you will be notified by email and
          the charge will be re-attempted on the 7th, 14th, and 20th days
          following your recurring payment date. At 21 days your account will
          become inactive and re-enrollment fees will be required to re-join the
          membership package.
        </p>

        <p>
          FOR ANNUAL MEMBERSHIPS: Your membership package is available for one
          year after purchasing the package.
        </p>
      </div>
    )
  },

  {
    no: 7,
    question: 'What is included in my membership?',
    answer: (
      <div className="row">
        <div className="col-md-6">
          <p>
            Adult memberships include:
          </p>

          <ul>
            <li>
              One basic cleaning and exam every 6 months
            </li>
            <li>
              Any necessary X-rays associated with those exams per your dentist
            </li>
            <li>
              One emergency exam and X-ray per year
            </li>
            <li>
              Discount on treatment that is determined by your dentist
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <p>
            Child memberships include:
          </p>

          <ul>
            <li>
              One basic cleaning and exam every 6 months
            </li>
            <li>
              Any necessary X-rays associated with those exams per your dentist
            </li>
            <li>
              One emergency exam and X-ray per year
            </li>
            <li>
              One Fluoride treatment per year
            </li>
            <li>
              Discount on treatment that is determined by your dentist
            </li>
          </ul>
        </div>
      </div>
    )
  },

  {
    no: 8,
    question: 'Do you offer Refunds?',
    answer: (
      <p>
        Refunds are available within 90 days as long as you haven’t received any
        services included with your package. Refund requests can be made by
        emailing <a href="mailto:info@dentalhq.com">info@dentalhq.com</a>.
        Please indicate the office of which you are a member so that we can
        verify you membership history and contact your provider to determine if
        any services have been utilized.
      </p>
    )
  },

  {
    no: 9,
    question:
      'What happens if I don’t use all of the services included in my membership, will I get a refund?',
    answer: (
      <p>
        If any services are used then NO REFUNDS ARE AVAILABLE.
      </p>
    )
  },

  {
    no: 10,
    question: 'What if I move or decide to transfer dental offices?',
    answer: (
      <div>
        <p>
          Memberships may be transferred to another office that also offers in
          office memberships through DentalHQ. However the following applies:
        </p>

        <ul>
          <li>
            Memberships may be transferred at any time, however if less than 6
            months of membership payments were made to your current office a
            re-enrollment fee of $99 will be charged to transfer to your new
            office
          </li>
          <li>
            Any changes in your new dentist plan will now be applicable
            including changes in pricing of the plan, changes in discounts
            offered on treatment, etc.
          </li>
          <li>
            Click{' '}
            <a
              href="http://www.google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              here
            </a>
            {' '}for a list of participating dentist offices
          </li>
        </ul>
      </div>
    )
  },

  {
    no: 11,
    question: 'How do I change my credit card information?',
    answer: (
      <p>
        You may easily update your credit card information through your user
        dashboard or simply call your dentist to update the card information.
      </p>
    )
  },

  {
    no: 12,
    question: 'How do I add/edit my family members?',
    answer: (
      <p>
        Adding/Editing family members is easy through your user dashboard. For
        help simply contact your dental provider.
      </p>
    )
  },

  {
    no: 13,
    question:
      'What happens if I have a disagreement with my dentist regarding my plan benefits?',
    answer: (
      <p>
        Your membership plan is setup by your dentist and as such all concerns
        and questions should be directed towards your dental provider. If you
        feel that your provider is unable to remedy your concerns, you may email
        DentalHQ at <a href="mailto:info@dentalhq.com">info@dentalHQ.com</a>.
        However, please understand that DentalHQ simply provides the software
        that automates these memberships for your dentist and has no authority
        over your dental provider.
      </p>
    )
  }

];

/*
FAQ
================================================================================
*/
@CSSModules(styles)
export default class FaqPage extends React.Component {
  render() {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Frequently Asked Questions" />

        <div className="container">
          <div className="col-md-12">
            <div styleName="content-wrapper">
              {QuestionAndAnswers.map((item, index) =>
                <QuestionAndAnswer key={index} {...item} />
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
