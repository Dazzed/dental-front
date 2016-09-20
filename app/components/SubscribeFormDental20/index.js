import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class SubscribeFormDental20 extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(token => {
      alert('Thank you, ${token.email}');
    });
  }

  render() {
    return (
      <StripeCheckout
        name="My Dental Market Place"
        description="Find an All-star Dentist!"
        image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
        ComponentClass="div"
        panelLabel="Adult Plan: "
        amount={2000}
        currency="USD"
        stripeKey="pk_test_71G4lapBvaU5MFU7Xq79iHRP"
        locale="auto"
        email="info@vidhub.co"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        //shippingAddress
        //billingAddress={false}
        // Note: enabling both zipCode checks and billing or shipping address will
        // cause zipCheck to be pulled from billing address (set to shipping if none provided).
        //zipCode={false}
        //alipay
        //bitcoin
        allowRememberMe={false}
        token={this.onToken}
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
        // you are using multiple stripe keys
        reconfigureOnUpdate={false}
        // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
        // useful if you're using React-Tap-Event-Plugin
        //triggerEvent="onTouchTap"
        >
        <button className="btn btn-primary">
          Subscribe
        </button>
      </StripeCheckout>
    )
  }
}

export default SubscribeFormDental20;
