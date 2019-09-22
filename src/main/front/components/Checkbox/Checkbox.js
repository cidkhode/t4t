import React from 'react';
import { string, func, bool } from 'prop-types';
import './Checkbox.less'

export const Checkbox = props => (
  <div className={ `t4t-checkbox-container ${props.extraClass}` }>
    <label className={ `t4t-checkbox-label ${props.disabled ? 'disabled' : ''}` }>
      { props.text }
      <input
        type="checkbox"
        className="checkbox-default-input"
        checked={ props.checked }
        onChange={ props.handleChange }
        disabled={ props.disabled }
      />
      <span className="checkbox-checkmark" />
    </label>
  </div>
);

Checkbox.propTypes = {
  disabled: bool,
  extraClass: string,
  text: string.isRequired,
  handleChange: func.isRequired,
  checked: bool,
};

Checkbox.defaultProps = {
  disabled: false,
  extraClass: '',
  checked: false,
};

export default Checkbox;