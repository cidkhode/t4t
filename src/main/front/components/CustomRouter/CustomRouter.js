import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const CustomRouter = ({ component: Component, isLoggedIn, componentProps, ...props }) => {
  return (
    <Route
      { ...props }
      render={ () =>
        isLoggedIn ? (
          <Component { ...componentProps } />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
};

CustomRouter.propTypes = {
  isLoggedIn: PropTypes.bool,
  component: PropTypes.any,
};

CustomRouter.defaultProps = {
  isLoggedIn: false,
};

export default CustomRouter;