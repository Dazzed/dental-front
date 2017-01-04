import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import Dropzone from 'react-dropzone';

import styles from './styles.css';

export default class ClassName extends React.Component {
  
    onDrop: function (acceptedFiles) {     
      console.log('Accepted files: ', acceptedFiles);
    },
      

  render () {
    return (
      <Well>
        <h2>Upload Photos!</h2>

        <Dropzone className={styles.dropzone} multiple={true} accept="image/*" onDrop={this.onDrop}>
          <p>
            Click or drop image files here
          </p>
        </Dropzone>    
      </Well>
    );
  }

}
