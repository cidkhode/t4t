import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom'

export class CustomRouter extends Component {
  render() {
    const { component: Component, isLoggedIn, componentProps, ...props } = this.props;
    console.log(`is logged in in custom router`, isLoggedIn);
    return (
      isLoggedIn ? <Component {...componentProps } /> : <Redirect to={ { pathname: '/', state: { from: props.location } } } />
    );
  }
}

CustomRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  componentToRender: PropTypes.any,
};


export default withRouter(CustomRouter);