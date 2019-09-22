import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import './InputButton.less';

export default class InputButton extends Component {
  static propTypes = {
    defaultValue: string,
    extraClass: string,
    placeholder: string,
    buttonText: string.isRequired,
    handleChange: func.isRequired,
    handleClick: func.isRequired,
    disabled: bool,
    error: bool
  };

  static defaultProps = {
    defaultValue: '',
    extraClass: '',
    placeholder: 'Whatever you do, don\'t type in\'error\'',
    disabled: false,
    error: false
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  onChange = event => {
    const { value } = event.target;
    this.setState({ value }, () => {
        this.props.handleChange(value);
    })
  };

  render() {
    return (
      <div className={ `t4t-input-container ${this.props.extraClass} ${this.props.disabled ? 'disabled' : ''} ${this.props.error ? 'error' : ''}` } >
        <input
          type="text"
          placeholder={ this.props.placeholder }
          value={ this.state.value }
          onChange={ this.onChange }
          className="t4t-input"
          disabled={ this.props.disabled }
        />
        <input
          type="button"
          onClick={ this.props.handleClick }
          value={ this.props.buttonText }
          className="t4t-input-button"
          disabled={ this.props.disabled }
        />
      </div>
    );
  }
}