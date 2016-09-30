import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


export default class SubscribeFormDental20 extends React.Component {

  onToken = (token) => {
    fetch('/charge20', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(data => {
      console.log('token', token, data);
    // (token => {
    //  alert('Thank you for subscribing!');
    });
  }

  render () {
    return (
      <div>
        <StripeCheckout
          name="My Dental Market Place"
          description="Find an All-star Dentist!"
          image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // eslint-disable-line
          ComponentClass="div"
          panelLabel="Adult Plan: "
          amount={2000}
          currency="USD"
          stripeKey="pk_test_71G4lapBvaU5MFU7Xq79iHRP"
          locale="auto"
          email="info@mydental.com"
          billingAddress={false}
          zipCode={false}
          allowRememberMe={false}
          token={this.onToken}
          reconfigureOnUpdate={false}
          triggerEvent="onClick"
        >
          <button className="btn btn-primary">
            Subscribe
          </button>
        </StripeCheckout>
      </div>
    );
  }
}
