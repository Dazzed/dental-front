/*
Patient Dashboard Header Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// app
import Avatar from 'components/Avatar';

// local
import styles from './styles.css';


/*
Patient Dashboard Header Component
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
export default class PatientDashboardHeader extends React.Component {

  static propType = {
    // passed in - data
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // passed in - data
      user,
    } = this.props;

    const memberSince = moment(user.createdAt).format('MMMM D, YYYY');

    return (
      <div styleName="patient-dashboard-header">
        <div className="row" styleName="user">

          <div className="col-sm-offset-3 col-sm-2">
            <Avatar url={user.avatar} size={'100%'} />
          </div>

          <div className="col-sm-7">
            <h2 styleName="user__name">{user.firstName} {user.lastName}</h2>
            <p styleName="user__info">
              <span styleName="user__info-label">Member Since:</span>
              {' '}
              {memberSince}
            </p>
          </div>

        </div>
      </div>
    );
  }


}