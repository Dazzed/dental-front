import React, { Component, PropTypes } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

// import PatientCard from 'components/PatientCard/PatientCard';

export default class PatientGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    patients: PropTypes.array,
    sortBy: PropTypes.string,
  }

  toggleSortByOptions = () => { }

  render () {
    const { title, patients } = this.props;
    console.log(patients);

    return (
      <div className="patient-group">
        <Row className="group-header">
          <Col md={3} className="title">{title}</Col>
          <Col md={6} className="bar" />
          <Col md={3} className="sort-by">
            <span>Sort by</span>
            <Glyphicon
              glyph="triangle-bottom"
              className="sorter-toggler"
              onClick={this.toggleSortByOptions}
            />
          </Col>
        </Row>
        {/* {patients && */}
        {/*   patients.map((patient, index) => */}
        {/*     <PatientCard {...patient} key={index} /> */}
        {/*   )} */}
      </div>
    );
  }
}
