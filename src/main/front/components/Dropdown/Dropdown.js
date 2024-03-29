import React, { Component } from 'react';
import Select from 'react-select';
import { bool, func, string, array } from "prop-types";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#56CCF2' : '#FFFFFF',
    '&:hover': { background: '#56CCF2' },
  }),
  control: (base, state) => ({
    ...base,
    '&:hover': { borderColor: '#2D9CDB'},
    boxShadow: 'none',
    border: state.isFocused ? 'solid 2px #0015FF' : 'solid 1px #000000'
  }),
};

export default class Dropdown extends Component {
  static propTypes = {
    extraClass: string,
    options: array.isRequired,
    onChange: func.isRequired,
    disabled: bool,
    isMulti: bool
  };

  static defaultProps = {
    extraClass: '',
    disabled: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ `t4t-dropdown-container ${this.props.extraClass}` }>
        <Select
          styles={ customStyles }
          options={ this.props.options }
          disabled={ this.props.disabled }
          onChange={ this.props.onChange }
          isMulti={ this.props.isMulti }
        />
      </div>
    )
  }
}