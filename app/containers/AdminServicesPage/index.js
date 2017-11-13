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
import {
  changePageTitle,
} from 'containers/App/actions';
import LoadingSpinner from 'components/LoadingSpinner';

import {
  fetchServices,
  addService,
  deleteService,
  toggleAddService,
} from 'containers/AdminManagePage/actions';

import AddServiceModal from './modals/addService';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/

function mapStateToProps(state) {
  return {
    services: state.AdminManagePage.services,
    addingService: state.AdminManagePage.addingService,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchServices: () => dispatch(fetchServices()),
    addService: (service) => dispatch(addService(service)),
    deleteService: (service) => dispatch(deleteService(service)),
    toggleAddService: (value) => dispatch(toggleAddService(value)),
  };
}


/*
Admin Services
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class AdminServicesPage extends Component {

  static propTypes = {
    changePageTitle: React.PropTypes.func.isRequired,
    fetchServices: React.PropTypes.func.isRequired,
    addingService: React.PropTypes.bool.isRequired,
    toggleAddService: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.changePageTitle('Dentist Services');
    this.props.fetchServices();
  }

  toggleAddingService = value => {
    this.props.toggleAddService(value);
  };

  addService = values => {
    this.props.addService({ service: { name: values.name } });
  };

  deleteService = service => {
    this.props.deleteService({service});
  };

  render() {
    const {
      services
    } = this.props;

    if (services.length === 0) {
      return (
        <div>
          <div>
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Tabs defaultActiveKey="dentist-services" id="dentist-services" styleName="tabs">
          <Tab eventKey="dentist-services" title="Services"></Tab>
        </Tabs>
        {
          services.map((service, index) => {
            return (
              <div className="row" styleName="list-entry__wrapper" key={`service_${index}`}>
                <div className="col-sm-12">
                  <div styleName="list-entry">

                    <div styleName="list-entry__header">
                      <span styleName="list-entry__title">
                        {index + 1}.) {service.name}
                      </span>

                      <span styleName="list-entry__toggle">
                        <input
                          type="button"
                          className={styles['button--short']}
                          value="DELETE SERVICE"
                          onClick={() => this.deleteService(service)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        <input
          type="button"
          className={styles['button--short']}
          value="ADD SERVICE"
          onClick={() => this.toggleAddingService(true)}
        />
        <AddServiceModal
          addingService={this.props.addingService}
          onCancel={() => this.toggleAddingService(false)}
          onSubmit={this.addService}
        />
      </div>
    );
  }
}


