import React from 'react';
import PropTypes from 'prop-types';
import './RadioButtonGroup.less';

const RadioButtonGroup = props => (
  <div className={`t4t-radiogroup-container ${props.extraClass}`}>
    { props.options.map((radio, index) => (
      <div className="radiobutton-container" key={ index } >
        <label className={ `radiobutton-label ${radio.disabled ? 'disabled' : ''}` }>{ radio.label }
          <input
            className="radio-default-input"
            type="radio"
            name={ props.group }
            value={ radio.value }
            disabled={ radio.disabled }
            onChange={ event => props.onChange(event.target.value) }
            checked={ props.checked === radio.value }
          />
          <span className="radio-checkmark" />
        </label>
      </div>
    )) }
  </div>
);

RadioButtonGroup.propTypes = {
  extraClass: PropTypes.string,
  group: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
  })).isRequired
};

RadioButtonGroup.defaultProps = {
  extraClass: '',
  disabled: false,
  checked: ''
};

export default RadioButtonGroup;