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
  const allSpecialty = [ (
    <MenuItem key={Math.random()} eventKey={null}>ALL</MenuItem>
  ) ];

  const specialties = specialtiesList.map((s, i) => {
    return (
      <MenuItem key={i} eventKey={s.id}>{s.name.toUpperCase()}</MenuItem>
    );
  });

  return allSpecialty.concat(specialties);
};

const Filters = (props) => {
  const {
    specialtiesList,
    onSelectDistance,
    onSelectSpecialty,
    onSelectSortType,
  } = props;
  return (
    <Row>
      <Col xs={3}>
        <h4>FILTER RESULTS BY:</h4>
      </Col>
      <Col xs={3}>
        <ButtonToolbar>
          <DropdownButton
            styleName="filter-button"
            bsSize="large"
            title="DISTANCE"
            id="dropdown-no-caret"
            onSelect={onSelectDistance}
          >
            <MenuItem eventKey="5">5 MILES</MenuItem>
            <MenuItem eventKey="10">10 MILES</MenuItem>
            <MenuItem eventKey="25">25 MILES</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </Col>
      <Col xs={3}>
        <ButtonToolbar>
          <DropdownButton
            styleName="filter-button"
            bsSize="large"
            title="SORT"
            id="dropdown-no-caret"
            onSelect={onSelectSortType}
          >
            <MenuItem eventKey="price">MEMBERSHIP PRICING</MenuItem>
            <MenuItem eventKey="score">REVIEW SCORE</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </Col>
      <Col xs={3}>
        <ButtonToolbar>
          <DropdownButton
            styleName="filter-button"
            bsSize="large"
            title="SPECIALTY"
            id="dropdown-no-caret"
            onSelect={onSelectSpecialty}
          >
            {renderSpecialties(specialtiesList)}
          </DropdownButton>
        </ButtonToolbar>
      </Col>
    </Row>
  );
};

export default CSSModules(styles)(Filters);
