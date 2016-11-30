import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'react-bootstrap';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import { markMsgRead } from 'containers/Dashboard/actions';
import {
  selectNewMsgCount, selectSorter,
} from 'containers/Dashboard/selectors';

import PatientCard from './PatientCard';
import styles from './PatientGroup.css';


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class PatientGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    groupKey: PropTypes.string,
    patients: PropTypes.array,
    sorter: PropTypes.object,
    newMsgCountBySender: PropTypes.object,
    markMsgRead: PropTypes.func,
  }

  constructor (props) {
    super(props);

    this.state = {
      showSorter: false,
    };
  }

  toggleSorter = () => {
    this.setState({
      ...this.state,
      showSorter: !this.state.showSorter,
    });
  }

  markMsgRead = (senderId) => {
    this.props.markMsgRead(senderId);
  }

  render () {
    const { title, patients, newMsgCountBySender } = this.props;

    return (
      <div>
        <Row styleName="group-header">
          <Col md={3} styleName="title">
            {title} ({patients ? patients.length : 0})
          </Col>
          <Col md={7} styleName="bar" />
          <Col md={2} styleName="sort-by" onClick={this.toggleSorter}>
            <span>Sort by</span>
            {this.state.showSorter
              ? <FaCaretDown size={16} styleName="sorter-toggler" />
              : <FaCaretRight size={16} styleName="sorter-toggler" />}
          </Col>
        </Row>

        {patients &&
          patients.map((patient, index) =>
            <PatientCard
              {...patient}
              newMsgCount={newMsgCountBySender[patient.id]}
              markMsgRead={this.markMsgRead}
              key={index}
            />
          )
        }
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    newMsgCountBySender: selectNewMsgCount(state),
    sorter: selectSorter(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    markMsgRead: (senderId) => dispatch(markMsgRead({ senderId })),
  };
}
