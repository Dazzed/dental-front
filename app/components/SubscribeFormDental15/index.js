import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


export default class SubscribeFormDental15 extends React.Component {

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(generatedToken => {
      alert(`Thank you, ${generatedToken.email}`);
    });
  }

  render () {
    const img = "https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"; // eslint-disable-line

    return (
      <StripeCheckout
        name="My Dental Market Place"
        description="Find an All-star Dentist!"
        image={img}
        ComponentClass="div"
        panelLabel="Kid's Plan: "
        amount={1500}
        currency="USD"
        stripeKey="pk_test_71G4lapBvaU5MFU7Xq79iHRP"
        locale="auto"
        email="info@vidhub.co"
        allowRememberMe={false}
        token={this.onToken}
        reconfigureOnUpdate={false}
        // Note: Enabling either address option will give the user the ability
        // to fill out both. Addresses are sent as a second parameter in the
        // token callback.
        // shippingAddress
        // billingAddress={false}
        // Note: enabling both zipCode checks and billing or shipping address
        // will cause zipCheck to be pulled from billing address
        // (set to shipping if none provided).
        // zipCode={false}
        // alipay
        // bitcoin
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some
        // reason you are using multiple stripe keys
        // Note: you can change the event to `onTouchTap`, `onClick`,
        // `onTouchStart` useful if you're using React-Tap-Event-Plugin
        // triggerEvent="onTouchTap"
      >
        <button className="btn btn-primary">
          Subscribe
        </button>
      </StripeCheckout>
    );
  }
}
