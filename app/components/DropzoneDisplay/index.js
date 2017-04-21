/*
Dropzone Display Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';
import FaPlus from 'react-icons/lib/fa/plus';
import FaTasks from 'react-icons/lib/fa/tasks';

// local
import styles from './styles.css';


/*
Dropzone Display
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
export default class UploadDisplay extends React.Component {

  render() {
    const {
      error,
      progress,
      uploadedFiles,
    } = this.props;

    /*
    Render Error State
    ------------------------------------------------------------
    */
    if (error !== undefined && error !== null) {
      return (
        <div styleName="dropzone-display dropzone-display--error">
          <p className="text-center">
            Invalid file.  Please try a different one.
          </p>
          <span styleName="dropzone-display__icon">
            <FaExclamationTriangle size={48} />
          </span>
        </div>
      );
    }

    /*
    Render Progress State
    ------------------------------------------------------------
    */
    if (progress !== undefined && progress !== progress) {
      return (
        <div styleName="dropzone-display dropzone-display--error">
          <span styleName="dropzone-display__icon">
            <FaTasks size={48} />
          </span>
        </div>
      );
    }

    /*
    Render Success State
    ------------------------------------------------------------
    */
    if (uploadedFiles.length > 0) {
      const url = uploadedFiles[0].fileUrl;

      return (
        <div styleName="dropzone-display dropzone-display--success">
          <span styleName="dropzone-display__icon">
            <FaPlus size={48} />
          </span>
          <img src={url} alt="Your Uploaded Image" styleName="dropzone-display__img" />
        </div>
      );
    }

    /*
    Render Prompt State (default)
    ------------------------------------------------------------
    */
    return (
      <div styleName="dropzone-display dropzone-display--prompt">
        <span styleName="dropzone-display__icon">
          <FaPlus size={48} />
        </span>
      </div>
    );
  }

}
