import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import LoadingIcon from '../LoadingIcon/LoadingIcon';

export class CustomRouter extends Component {
  render() {
    const { component: Component, isLoggedIn, isLoading, waitingToCheck, componentProps } = this.props;

    if (isLoading) {
      return <LoadingIcon />
   	} else if (waitingToCheck || isLoggedIn || window.location.pathname === '/') {
      return <Component { ...componentProps } isLoggedIn={ isLoggedIn } />;
   	} else {
      return <Redirect to='/' from={`${window.location.pathname}`} />;
    }
  }
}

CustomRouter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  waitingToCheck: PropTypes.bool.isRequired,
  componentToRender: PropTypes.any,
};

export default withRouter(CustomRouter);