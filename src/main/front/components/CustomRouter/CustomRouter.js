import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import { LoadingIcon } from '../LoadingIcon/LoadingIcon';

export class CustomRouter extends Component {
  render() {
    const { component: Component, isLoggedIn, isLoading, waitingToCheck, componentProps, ...props } = this.props;
    console.log(`is waititng?: ${waitingToCheck}\n\ris logged in?: ${isLoggedIn}\n\rrouter pathname: ${window.location.pathname}\n\rwindow pathname: ${this.props.location.pathname} `);

   	// if is loading
    if (isLoading) {
    	// show loading animation
    	return(<LoadingIcon />);

    // if waiting on login status
   	} else if (waitingToCheck) {
   		return(<Component {...componentProps } isLoggedIn={isLoggedIn} />);

   	// if login status is set or if on the homepage (doesnt require auth)
   	} else if (isLoggedIn || window.location.pathname === '/') {
   		return(<Component {...componentProps } isLoggedIn={isLoggedIn} />);
	
	// redirect to home if not loading, waititng, or logged in
	} else {
		return(<Redirect to='/' from={`${window.location.pathname}`} />);
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