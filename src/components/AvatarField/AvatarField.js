import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';

import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Image from 'react-bootstrap/lib/Image';
import { change } from 'redux-form';
// import Button from 'react-bootstrap/lib/Button';
// import HelpBlock from 'react-bootstrap/lib/HelpBlock';
// import Well from 'react-bootstrap/lib/Well';
// import FontAwesome from 'react-fontawesome';

const logger = debug('app:AvatarField');


const mapDispatchToProps = (dispatch) => ({
  update: (form, field, data) => {
    const action = change(form, `${field}Image`, data);
    logger(action);
    dispatch(action);
  },
});


/**
 * Avatar component, depend on redux-form.
 *
 * TODO: now creates the field on ${name}Image maybe just call it as avatar.
 */
@connect(() => ({}), mapDispatchToProps)
class AvatarField extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    autofilled: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onDragStart: React.PropTypes.func.isRequired,
    onDrop: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    value: React.PropTypes.any.isRequired,
    update: React.PropTypes.func.isRequired,
    form: React.PropTypes.string.isRequired,
  };

  constructor(props, context, updater) {
    super(props, context, updater);

    this.state = {
      dataUri: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = this.state.filename !== nextState.filename;
    logger('Should component update: ', shouldUpdate);
    return shouldUpdate;
  }

  handleChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (upload) => {
      const data = {
        dataUri: upload.target.result,
        filename: file.name,
        filetype: file.type
      };
      this.setState(data);
      this.props.update(this.props.form, this.props.name, data);
    };

    reader.readAsDataURL(file);
    this.props.onChange(event);
  }

  render() {
    const { dataUri } = this.state;
    const { active, autofilled, name, onBlur, onChange, onDragStart, onDrop,
      onFocus, value, ...args } = this.props;

    return (
      <div>
        <FormGroup controlId="test">
          <Image className="img-responsive" src={dataUri} rounded />
          <FormControl
            type="file"
            active={active}
            autofilled={autofilled}
            name={name}
            onBlur={onBlur}
            onChange={this.handleChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
          />
        </FormGroup>
      </div>
    );
  }

}

export default AvatarField;
