import React from 'react';
import CSSModules from 'react-css-modules';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import FaMinusSquare from 'react-icons/lib/fa/minus-square';

import styles from './QuestionAndAnswer.css';

@CSSModules(styles)
export default class QuestionAndAnswer extends React.Component {
  static propTypes = {
    no: React.PropTypes.number,
    question: React.PropTypes.string,
    answer: React.PropTypes.func.function,
  };

  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  render () {
    const { isOpen } = this.state;
    const { no, question, answer } = this.props;

    return (
      <div>
        <div styleName="question" onClick={this.toggle}>
          <span styleName="title">
            {`Q${no}. ${question}`}
          </span>
          <span styleName="toggle-icon">
            { isOpen
                ? <FaMinusSquare size={20} />
                : <FaPlusSquare size={20} />
            }
          </span>
          <div className="clearfix" />
        </div>

        { isOpen &&
          <div styleName="answer">
            {answer}
          </div>
        }
      </div>
    );
  }
}
