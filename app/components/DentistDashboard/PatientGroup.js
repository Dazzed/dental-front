import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'react-bootstrap';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import PatientCard from './PatientCard';
import styles from './PatientGroup.css';

@CSSModules(styles, { allowMultiple: true })
export default class PatientGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    patients: PropTypes.array,
    sorter: PropTypes.object,
  }

  constructor (props) {
    super(props);

    this.state = {
      showSorter: false,
    };

    this.toggleSorter = this.toggleSorter.bind(this);
  }

  toggleSorter () {
    this.setState({
      ...this.state,
      showSorter: !this.state.showSorter,
    });
  }

  render () {
    const { title, patients } = this.props;

    return (
      <div>
        <Row styleName="group-header">
          <Col md={3} styleName="title">{title}</Col>
          <Col md={7} styleName="bar" />
          <Col md={2} styleName="sort-by" onClick={this.toggleSorter}>
            <span>Sort by</span>
            {
              this.state.showSorter
                ? <FaCaretDown size={16} styleName="sorter-toggler" />
                : <FaCaretRight size={16} styleName="sorter-toggler" />
            }
          </Col>
        </Row>
        {patients &&
          patients.map((patient, index) =>
            <PatientCard {...patient} key={index} />
          )
        }
      </div>
    );
  }
}
