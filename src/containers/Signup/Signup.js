import React from 'react';
import Helmet from 'react-helmet';

import AccountInformation from 'components/SignupForms/AccountInformation';
import ProfileInformation from 'components/SignupForms/ProfileInformation';
import PageHeader from 'components/PageHeader/PageHeader';


class Signup extends React.Component {
  render() {
    return (
      <div>
        <PageHeader title="User Account Signup" />
        <Helmet title="Signup"/>
        <div className="container">
          <form>
            <AccountInformation />
            <h1 className="green">Primary Account Holder</h1>
            <ProfileInformation />
          </form>
        </div>
      </div>
    );
  }
}


export default Signup;
