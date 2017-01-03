import React from 'react';
import CSSModules from 'react-css-modules';

import PageHeader from 'components/PageHeader';
import QuestionAndAnswer from './QuestionAndAnswer';
import styles from './index.css';

/* eslint-disable */
const QuestionAndAnswers = [
  {
    no: 1,
    question: 'What is Periodontal Disease (also referred to as Gum Disease)?  What happens if my Dentist determines that I have Periodontal Disease?',
    answer: (
      <ul>
        <li>
          Periodontal disease or Gum disease is an infection of the tissues that surround and support your teeth. It is present in roughly 10 percent of adults.  It is a major cause of tooth loss in adults. Because gum disease is usually painless, you may not know you have it. (for more information:{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.perio.org/consumer/types-gum-disease.html">
              https://www.perio.org/consumer/types-gum-disease.html
            </a>
            )
        </li>
        <li>
          If you’re dentist determines that you have Periodontal Disease he will recommend a treatment known as Scaling and Root planning or commonly referred to as a “Deep Cleaning”.  This treatment involves anesthetizing your gums so that you are comfortable and then using instruments to remove the hardened tarter and bacteria from below your gum line.  This treatment will need to be completed prior to your routine cleaning.  The costs for this treatment is not included in your membership.
        </li>
      </ul>
    )
  },

  {
    no: 2,
    question: 'What is a membership dental plan?',
    answer: (
      <ul>
        <li>
          Your membership is a loyalty plan being offered by your dental provider.  Regular preventative dental appointments promote oral health which is vital to your overall health.  Your dentist has created this membership to include your basic annual preventive needs at a discount and broken down into affordable monthly payments.  This membership plan is between you and your dentist.  DentalHQ simply processes the plan that your dentist offers.
        </li>
      </ul>
    )
  },

  {
    no: 3,
    question: 'When will I be billed?',
    answer: (
      <ul>
        <li>
          If you signed up for a monthly membership plan your recurring payment will be billed on the same date each month.  If you signed up on the 29th, 30th, or 31st of the month and that day doesn’t exist in the following months then you will be billed on the last day of the following month.
        </li>
      </ul>
    )
  },

  {
    no: 4,
    question: 'What happens if I cancel my membership?',
    answer: (
      <ul>
        <li>
          You may cancel your membership at anytime.  However, if you cancel your membership in less than 3 months, a $20 administrative fee will be charged per member.  This fee is to cover the cost of providing your treatment and the processing cost of administering you dental membership.  If you cancel your membership after 3 months, no fees will apply.
        </li>
      </ul>
    )
  },

  {
    no: 5,
    question: 'What happens if I cancel my membership and decide to re-enroll?',
    answer: (
      <ul>
        <li>
          Re-enrollment into the membership plan is subject to a $99 re-enrollment fee.  This may be waived by your dentist at their disgression.
        </li>
      </ul>
    )
  },

  {
    no: 6,
    question: 'How long is my membership active?',
    answer: (
      <ul>
        <li>
          You are eligible for the services included in your membership for 30 days after your most recent payment.  If payment is delinquent by 60 days or more, your account will automatically become inactive and re-enrollment fees may apply.
        </li>
      </ul>
    )
  },

  {
    no: 7,
    question: 'What is included in my membership?',
    answer: (
      <ul>
        <li>
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
        </li>
        <li>
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
        </li>
      </ul>
    )
  },

  {
    no: 8,
    question: 'What happens if I don’t use all of the services included in my membership, will I get a refund?',
    answer: (
      <ul>
        <li>
          Full refund will be allowed if request is made within 30 days of initial payment unless any services have already been rendered. No refunds will be issued once services have been rendered. All refund requests should be emailed to dentalHQ@gmail.com.
        </li>
      </ul>
    )
  },

  {
    no: 9,
    question: 'What if I move or decide to transfer dental offices?',
    answer: (
      <ul>
        <li>
          Memberships may be transferred to another office that also offers in office memberships through DentalHQ.  However the following applies;
          <ul>
            <li>
              Memberships may be transferred at any time, however if less than 6 months of membership payments were made to your current office a re-enrollment fee will be charged to transfer to your new office
            </li>
            <li>
              Any changes in your new dentist plan will now be applicable including changes in pricing of the plan, changes in discounts offered on treatment, etc..
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
        </li>
      </ul>
    )
  },

  {
    no: 10,
    question: 'How do I change my credit card information?',
    answer: (
      <ul>
        <li>
          You may easily update your credit card information through your user dashboard or simply call your dentist to update the card information
        </li>
      </ul>
    )
  },

  {
    no: 11,
    question: 'How do I add/edit my family members?',
    answer: (
      <ul>
        <li>
          Adding/Editing family members is easy through your user dashboard.  For help simply contact your dental provider.
        </li>
      </ul>
    )
  },

  {
    no: 12,
    question: 'What happens if I have a disagreement with my dentist regarding my plan benefits?',
    answer: (
      <ul>
        <li>
          Your membership plan is setup by your dentist and as such all concerns and questions should be directed towards your dental provider.  If you feel that your provider is unable to remedy your concerns, you may email DentalHQ at <a href="mailto:info@dentalhq.com"
        rel="noopener noreferrer">info@dentalhq.com</a>.  However, please understand that DentalHQ simply processes these memberships and has no authority over your dental provider.
        </li>
      </ul>
    )
  }
];

@CSSModules(styles)
export default class FaqPage extends React.Component {
  render () {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Frequently Asked Questions" />
        <div className="container">
          <div className="col-md-12">
            { QuestionAndAnswers.map((item, index) =>
                <QuestionAndAnswer
                  key={index}
                  {...item}
                />
              )
            }
          </div>
          <div className="col-md-12">
            Don't see your question here?  Please contact support here{' '}
            <a href="mailto:info@dentalhq.com">
              info@dentalhq.com
            </a>.
          </div>
        </div>
      </div>
    );
  }
}
