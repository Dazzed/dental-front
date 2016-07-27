import React from 'react';

import Header from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';
import styles from './PageHeader.scss';


const PageHeader = ({ title }) => {
  return (
    <div className={styles.pageHeader}>
      <Grid>
        <Header>{title}</Header>
      </Grid>
    </div>
  );
};


PageHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
};


export default PageHeader;
