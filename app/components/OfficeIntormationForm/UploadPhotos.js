import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import Dropzone from 'react-dropzone';

import styles from './styles.css';

export default class ClassName extends React.Component {
  
  getInitialState: function () {
        return {
          files: []
        };
    },

    onDrop: function (acceptedFiles) {
      this.setState({
        files: acceptedFiles
      });
      
      console.log('Accepted files: ', acceptedFiles);
    },
      

  render () {
    return (
      <Well>
        <h2>Upload Photos</h2>

        <Dropzone className={styles.dropzone} multiple={true} accept="image/*" onDrop={this.onDrop}>
          <p>
            Click or drop image files here
          </p>
        </Dropzone>
      
      {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                </div> : null}
    
      </Well>
    );
  }

}
