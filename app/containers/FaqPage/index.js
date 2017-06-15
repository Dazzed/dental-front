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
      'What is Periodontal Disease (also referred to as Gum Disease)?  What happens if my Dentist determines that I have Periodontal Disease?',
    answer: (
      <div>
        <p>
          Periodontal disease or Gum disease is an infection of the tissues that
          surround and support your teeth. It is present in roughly 10 percent
          of adults. It is a major cause of tooth loss in adults. Because gum
          disease is usually painless, you may not know you have it. (for more
          information:{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.perio.org/consumer/types-gum-disease.html"
          >
            https://www.perio.org/consumer/types-gum-disease.html
          </a>
          )
        </p>
        <p>
          If you’re dentist determines that you have Periodontal Disease he will
          recommend a treatment known as Scaling and Root planning or commonly
          referred to as a “Deep Cleaning”. This treatment involves
          anesthetizing your gums so that you are comfortable and then using
          instruments to remove the hardened tarter and bacteria from below your
          gum line. This treatment will need to be completed prior to your
          routine cleaning. The costs for this treatment is not included in your
          membership.
        </p>
      </div>
    )
  },

  {
    no: 2,
    question: 'What is a membership dental plan?',
    answer: (
      <p>
        Your membership is a loyalty plan being offered by your dental provider.
        Regular preventative dental appointments promote oral health which is
        vital to your overall health. Your dentist has created this membership
        to include your basic annual preventive needs at a discount and broken
        down into affordable monthly payments. This membership plan is between
        you and your dentist. DentalHQ simply processes the plan that your
        dentist offers.
      </p>
    )
  },

  {
    no: 3,
    question: 'When will I be billed?',
    answer: (
      <p>
        If you signed up for a monthly membership plan your recurring payment
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
      <p>
        You may cancel your membership at anytime. However, if you cancel your
        membership in less than 3 months, a $20 administrative fee will be
        charged per member. This fee is to cover the cost of providing your
        treatment and the processing cost of administering you dental
        membership. If you cancel your membership after 3 months, no fees will
        apply.
      </p>
    )
  },

  {
    no: 5,
    question: 'What happens if I cancel my membership and decide to re-enroll?',
    answer: (
      <p>
        Re-enrollment into the membership plan is subject to a $99 re-enrollment
        fee. This may be waived by your dentist at their disgression.
      </p>
    )
  },

  {
    no: 6,
    question: 'How long is my membership active?',
    answer: (
      <p>
        You are eligible for the services included in your membership for 30
        days after your most recent payment. If payment is delinquent by 60 days
        or more, your account will automatically become inactive and
        re-enrollment fees may apply.
      </p>
    )
  },

  {
    no: 7,
    question: 'What is included in my membership?',
    answer: (
      <div className="row">
        <div className="col-md-6">
          Child memberships include
          <ul>
            <li>
              One basic cleaning and exam every 6 months
            </li>
            <li>
              Any necessary xrays associated with those exams per your dentist
            </li>
            <li>
              One emergency exam and xray per year
            </li>
            <li>
              One Fluoride treatment per year
            </li>
            <li>
              Discount on treatment that is determined by your dentist
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          Adult memberships include
          <ul>
            <li>
              One basic cleaning and exam every 6 months
            </li>
            <li>
              Any necessary xrays associated with those exams per your dentist
            </li>
            <li>
              One emergency exam and xray per year
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
    question:
      'What happens if I don’t use all of the services included in my membership, will I get a refund?',
    answer: (
      <p>
        No refunds are available with your membership, however you may cancel at
        any time.
      </p>
    )
  },

  {
    no: 9,
    question: 'What if I move or decide to transfer dental offices?',
    answer: (
      <p>
        Memberships may be transferred to another office that also offers in
        office memberships through DentalHQ. However the following applies;
        <ul>
          <li>
            Memberships may be transferred at any time, however if less than 6
            months of membership payments were made to your current office a
            re-enrollment fee will be charged to transfer to your new office
          </li>
          <li>
            Any changes in your new dentist plan will now be applicable
            including changes in pricing of the plan, changes in discounts
            offered on treatment, etc..
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
      </p>
    )
  },

  {
    no: 10,
    question: 'How do I change my credit card information?',
    answer: (
      <p>
        You may easily update your credit card information through your user
        dashboard or simply call your dentist to update the card information
      </p>
    )
  },

  {
    no: 11,
    question: 'How do I add/edit my family members?',
    answer: (
      <p>
        Adding/Editing family members is easy through your user dashboard. For
        help simply contact your dental provider. Please not that if a new
        member is added in the middle of you’re your recurring payment cycle
        then THEIR membership will be prorated in order to maintain the existing
        recurring payment date. I.e. if a member is added halfway between you
        recurring payment dates then they will be charged half of their
        membership fee on that day and then the full membership fee on the
        recurring payment date. (this part just needs to be added to the
        existing answer)
      </p>
    )
  },

  {
    no: 12,
    question:
      'What happens if I have a disagreement with my dentist regarding my plan benefits?',
    answer: (
      <p>
        Your membership plan is setup by your dentist and as such all concerns
        and questions should be directed towards your dental provider. If you
        feel that your provider is unable to remedy your concerns, you may email
        DentalHQ at
        {' '}
        <a href="mailto:info@dentalhq.com" rel="noopener noreferrer">
          info@dentalhq.com
        </a>. However, please understand that DentalHQ simply processes these
        memberships and has no authority over your dental provider.
      </p>
    )
  },

  {
    no: 13,
    question: 'Refund',
    answer: (
      <p>
        Full refund will be allowed if request is made within 30 days of initial
        payment unless any services have already been rendered. No refunds will
        be issued once services have been rendered. All refund requests should
        be emailed to
        {' '}
        <a href="mailto:dentalHQ@gmail.com">
          dentalHQ@gmail.com
        </a>.
      </p>
    )
  },
  {
    no: 14,
    question:
      'What if my dentist offers different membership options and I want to make a change?',
    answer: (
      <p>
        You can easily edit you membership plan through your dashboard or by
        asking your dentist to make the change. Any change in membership plan
        pricing will occur on your recurring payment date.
      </p>
    )
  },
  {
    no: 15,
    question: 'Do you offer Non-Recurring payment options?',
    answer: (
      <p>
        Some dentist may elect to offer annual membership options. With these
        plans you pay one larger fee for a membership lasting an entire year.
        These plans are NON-Recurring. You will be emailed in advance of the
        expiration of the plan and be asked to renew. You may update your
        monthly plan into an annual plan and vice versa. This changes will take
        place at the recurring payment date or at the end of your annual
        membership. For more information regarding Annual Memberships please
        contact your dentist.
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
