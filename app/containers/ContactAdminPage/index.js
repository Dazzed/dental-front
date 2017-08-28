/*
Contact Admin Page
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React, { Component } from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

// app
import contactAdminProfilePhoto from 'assets/images/contact-admin-profile-photo.jpg';
import Avatar from 'components/Avatar';
import {
  changePageTitle,
} from 'containers/App/actions';
import LoadingSpinner from 'components/LoadingSpinner';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/

function mapStateToProps(state) {
  return {
    user: state.global.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}


/*
Contact Admin
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class ContactAdminPage extends Component {

  static propTypes = {
    changePageTitle: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.changePageTitle('Contact Admin');
  }

  render() {
    const {
      user
    } = this.props;

    if (!user.dentistInfo) {
      return (
        <div>
          <div>
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }
    else {
      const {
        dentistInfo:{
          manager
        }
      } = user;
      if (!manager) {
        return (
          <div>
            <Tabs defaultActiveKey="contact-admin" id="contact-admin-tabs" styleName="tabs">
              <Tab eventKey="contact-admin" title="Admin Contact Info"></Tab>
            </Tabs>

            <div styleName="content">
              <div styleName="admin">
                <div className="row">
                  <h3 styleName="admin-overview__name">
                    You do not have any Account Managers assigned yet.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div>
          <Tabs defaultActiveKey="contact-admin" id="contact-admin-tabs" styleName="tabs">
            <Tab eventKey="contact-admin" title="Admin Contact Info"></Tab>
          </Tabs>

          <div styleName="content">
            <div styleName="admin">
              <div className="row">

                {/*
              Avatar
              ------------------------------------------------------------
              */}
                <div className="col-sm-2">
                  <div styleName="admin-avatar">
                    <Avatar url={""} size={'100%'} />
                  </div>
                </div>

                <div className="col-sm-10">

                  {/*
                Member Overview
                ------------------------------------------------------------
                */}
                  <div styleName="admin-overview">
                    <div className="row">
                      <div className="col-sm-7">
                        <h3 styleName="admin-overview__name">
                          {`${manager.firstName} ${manager.lastName}`}
                          {' '}
                          <small>(Account Manager)</small>
                        </h3>
                      </div>
                    </div>

                    <div styleName="divided-row">
                      <div className="row">
                        <div className="col-sm-3">
                          <span styleName="admin-overview__info">{manager.phoneNumbers[0].number}</span>
                        </div>
                        <div className="col-sm-6">
                          <a href="mailto:ashley@dentalhq.com" styleName="admin-overview__email">{manager.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End Admin Col */}
                </div>
                {/* End Admin Row */}
              </div>
              {/* End Admin Div */}
            </div>

            {/* End Content Div */}
          </div>
          {/* End Wrapper Div */}
        </div>
      );
    }
  }
}
