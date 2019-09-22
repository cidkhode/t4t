import React from 'react';
import { string, func, bool } from 'prop-types';
import './Button.less'

export const Button = props => (
    <input
        type="button"
        className={ `${props.extraClass} t4t-button` }
        value={ props.text }
        onClick={ props.handleClick }
        disabled={ props.disabled }
    />
);

Button.propTypes = {
    disabled: bool,
    extraClass: string,
    text: string.isRequired,
    handleClick: func.isRequired,
};

Button.defaultProps = {
    disabled: false,
    extraClass: '',
};

export default Button;