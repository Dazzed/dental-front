import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import Dropzone from 'react-dropzone';
import CSSModules from 'react-css-modules';

import styles from './styles.css';


@CSSModules(styles)
export default class ClassName extends React.Component {

  render () {
    return (
      <Well>
        <h2>Upload Photos</h2>

        <Dropzone styleName="dropzone">
          <p>
            Click or drop image files here
          </p>
        </Dropzone>
      </Well>
    );
  }

}
