/*
Question and Answer Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';

// local
import styles from './QuestionAndAnswer.css';


/*
Question And Answer
================================================================================
*/
function QuestionAndAnswer({ question, answer }) {
  return (
    <div styleName="qanda">
      <h4 styleName="qanda__question">
        {question}
      </h4>

      <div styleName="qanda__answer">
        {answer}
      </div>
    </div>
  );
}

/*
Props
------------------------------------------------------------
*/
QuestionAndAnswer.propTypes = {
  no: React.PropTypes.number,
  question: React.PropTypes.string,
  answer: React.PropTypes.object,
};

export default CSSModules(styles, { allowMultiple: true })(QuestionAndAnswer); 
