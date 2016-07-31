import React from 'react';
import Helmet from 'react-helmet';

import AccountInformation from 'components/SignupForms/AccountInformation';
import ProfileInformation from 'components/SignupForms/ProfileInformation';
import FamilyMembers from 'components/SignupForms/FamilyMembers';
import PageHeader from 'components/PageHeader/PageHeader';


class Signup extends React.Component {
  render() {
    return (
      <div>
        <PageHeader title="User Account Signup" />
        <Helmet title="Signup"/>
        <div className="container">
          <AccountInformation />
          <h1 className="green">Primary Account Holder</h1>
          <ProfileInformation />
          <FamilyMembers />
        </div>
      </div>
    );
  }
}


export default Signup;
