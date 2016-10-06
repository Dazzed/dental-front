import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import Dropzone from 'react-dropzone';

import styles from './styles.css';

export default class ClassName extends React.Component {

  render () {
    return (
      <Well>
        <h2>Upload Photos</h2>

        <Dropzone className={styles.dropzone}>
          <p>
            Click or drop image files here
          </p>
        </Dropzone>
      </Well>
    );
  }

}
