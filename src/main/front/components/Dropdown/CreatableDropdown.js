import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import { bool, func, string, array, object, oneOfType } from "prop-types";

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
    border: state.isFocused ? 'solid 2px #56CCF2' : 'solid 1px #000000'
  }),
};

export default class CreatableDropdown extends Component {
  static propTypes = {
    extraClass: string,
    options: array.isRequired,
    onChange: func.isRequired,
    disabled: bool,
    isMulti: bool,
    value: oneOfType([array, object]),
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
        <CreatableSelect
          styles={ customStyles }
          options={ this.props.options }
          disabled={ this.props.disabled }
          onChange={ this.props.onChange }
          isMulti={ this.props.isMulti }
          value={ this.props.value }
        />
      </div>
    )
  }
}