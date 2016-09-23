/*
 *
 * EditOfficeInformation
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';

import OfficeIntormationForm from 'components/OfficeIntormationForm';

import { changePageTitle } from 'containers/App/actions';
import {
  fetchDentistInfo,
  updateDentistInfo,
} from 'containers/EditOfficeInformation/actions';
import { selectCurrentUser } from 'containers/App/selectors';

import toothImg from 'assets/images/tooth-mag.png';
import styles from './styles.css';


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class EditOfficeInformation extends React.Component {

  static propTypes = {
    changePageTitle: React.PropTypes.func.isRequired,
    fetchDentistInfo: React.PropTypes.func.isRequired,
    updateDentistInfo: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ]),
  }

  componentWillMount () {
    this.props.changePageTitle('Edit Office Information');
    this.props.fetchDentistInfo();
  }

  handleSubmit = (data) => {
    this.props.updateDentistInfo(data);
  }

  render () {
    const { loggedInUser } = this.props;

    return (
      <div>
        <Row styleName="lead">
          <Col md={7}>
            <h3>
              Hello {loggedInUser.firstName} {loggedInUser.lastName}
            </h3>
            <p>
              This page will allow you to setup your account profile page.
              This is what potential patients will see so make sure it clear
              and welcoming.
            </p>
          </Col>
          <Col md={5}>
            <Image src={toothImg} />
          </Col>
        </Row>

        <OfficeIntormationForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    changePageTitle: title => dispatch(changePageTitle(title)),
    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    updateDentistInfo: (data) => dispatch(updateDentistInfo(data)),
  };
}


function mapStateToProps (state) {
  return {
    loggedInUser: selectCurrentUser(state),
  };
}
