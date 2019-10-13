import React from 'react';
import { bool, func, string } from 'prop-types';
import './Textarea.less';

export const Textarea = props => {
  return (
    <div className={ `t4t-textarea-container ${props.extraClass} ${props.disabled ? 'disabled' : ''} ${props.error ? 'public.404.html' : ''}` }>
      <textarea
        className="t4t-textarea"
        onChange={ e => props.handleChange(e.target.value) }
        defaultValue={ props.value }
        disabled={ props.disabled }
      />
      {props.hint && <label>{props.hint}</label> }
    </div>
  );
};

Textarea.propTypes = {
  disabled: bool,
  error: bool,
  extraClass: string,
  title: string,
  hint: string,
  placeholder: string.isRequired,
  value: string.isRequired,
  handleChange: func.isRequired,
};

Textarea.defaultProps = {
  disabled: false,
  error: false,
  extraClass: '',
};

export default Textarea;