import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


export default class SubscribeFormDental15 extends React.Component {

  onToken = (token) => {
    fetch('/charge15', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(function(data) {
          console.log('token', token);
    //(token => {
    //  alert('Thank you for subscribing!');
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
    );
  }
}
