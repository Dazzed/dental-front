import React from 'react';

import { connect } from 'react-redux';
import Image from 'react-bootstrap/lib/Image';
import { actions as toastrActions } from 'react-redux-toastr';

import { uploadAvatar } from 'containers/Dashboard/actions';

import style from './Avatar.css';


function mapDispatchToProps (dispatch) {
  return {
    error: message => dispatch(toastrActions.error(message)),
    uploadAvatar: (file, user) => dispatch(uploadAvatar(file, user)),
  };
}


@connect(null, mapDispatchToProps)
export default class AvatarEditor extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    userId: React.PropTypes.number.isRequired,
    error: React.PropTypes.func.isRequired,
    uploadAvatar: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    src: null, // TODO - was 'http://www.teenink.com/images/default_face.gif',
  }

  handleClick = (event) => {
    this.input.click(event);
  }

  handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.match(/.(png|jpg|jpeg)/)) {
        this.props.error('Images supported: png, jpg, jpeg');
        return;
      }

      if (file.size >= 3 * 1200 * 1200) {
        this.props.error('Image size must be less than 3MB');
        return;
      }

      this.props.uploadAvatar(event.target.files[0], this.props.userId);
    }
  }

  render () {
    const { src } = this.props;
    const avatar = src || AvatarEditor.defaultProps.src;

    /* eslint-disable */
    return (
      <div className={style.wrapper} onClick={this.handleClick} >
        <Image src={avatar} />
        <input
          type="file"
          onChange={this.handleChange}
          ref={(element) => { this.input = element; }}
        />
      </div>
    );
    /* eslint-enable */
  }

}
