import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import styles from './styles.css';
import './custom.css';

import {
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

const renderSpecialties = specialtiesList => {
  return specialtiesList.map((s, i) => {
    return (
      <MenuItem key={i} eventKey={i}>{s.name}</MenuItem>
    );
  });
};

const Filters = (props) => {
  const {
    specialtiesList
  } = props;
  return (
    <Row>
      <Col xs={3}>
        <h4>FILTER RESULTS BY:</h4>
      </Col>
      <Col xs={3}>
        <ButtonToolbar>
          <DropdownButton styleName="filter-button" bsSize="large" title="DISTANCE: " noCaret id="dropdown-no-caret">
            <MenuItem eventKey="1">5 MILES</MenuItem>
            <MenuItem eventKey="2">10 MILES</MenuItem>
            <MenuItem eventKey="3">25 MILES</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </Col>
      <Col xs={3}>
        <ButtonToolbar>
          <DropdownButton styleName="filter-button" bsSize="large" title="SORT: " noCaret id="dropdown-no-caret">
            <MenuItem eventKey="1">MEMBERSHIP PRICING</MenuItem>
            <MenuItem eventKey="2">REVIEW SCORE</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </Col>
      <Col xs={3}>
        <ButtonToolbar>
          <DropdownButton styleName="filter-button" bsSize="large" title="SPECIALTY: " noCaret id="dropdown-no-caret">
            {renderSpecialties(specialtiesList)}
          </DropdownButton>
        </ButtonToolbar>
      </Col>
    </Row>
  );
};

export default CSSModules(styles)(Filters);
