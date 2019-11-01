import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Components */
import Button from "../Button/Button";
import Signin from "../Modal/Signin/Signin";
import Signup from "../Modal/Signup/Signup";
import Searchbar from '../Searchbar/Searchbar';

/* Redux Actions - Modal Toggles */
import { toggleSigninModal, toggleSignupModal } from '../../redux/actions/modal.js';

/* Images */
import searchImg from '../../assets/search.png'

import { POPUP_KEYS, LOCAL_STORAGE_KEYS } from '../../utils/constants';

/* Styles */
import './Navbar.less';

export class Navbar extends Component {
  static PropTypes = {
    history: PropTypes.object,
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    }
  }

  onSearchInputChange = e => {
    const { target } = e;
    this.setState({ searchText: target.value });
  };

  onSearch = () => {
    console.log(`Searching for: `, this.state.searchText);
  };

  sendLogin = (values) => {
    const { email, password } = values;
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,password })
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.status === 0) {
          this.props.history.push('/account');
          this.props.toggleSigninModal();
          localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL, email);
        }
      })
      .catch(error => console.error("Something went wrong.", error));
  };

  render() {
    return (
      <div className="navhead">
        <div className="navbar-left-floated-content">
          <button className="logo">LOGO</button>
        </div>
        <div className="navbar-right-floated-content">
          <Searchbar
            extraClass="navbar-search-bar nav-bar-right-child"
            searchInputValue={ this.state.searchText }
            onSearch={ this.onSearch }
            onSearchInputChange={ this.onSearchInputChange }
            searchIconPath={ searchImg }
          />
          <Button
            extraClass="nav-bar-sign-in-button nav-bar-right-child"
            handleClick={ this.props.toggleSigninModal }
            text="Log in"
          />
          <Button
            extraClass="nav-bar-sign-up-button"
            handleClick={ this.props.toggleSignupModal }
            text="Register!"
          />
          <Signin
            sendLogin={ this.sendLogin }
            closeSignin={ this.props.toggleSigninModal }
            isActive={ this.props.modal_status.is_signin_open }
          />
          <Signup
            closeSignup={ this.props.toggleSignupModal }
            isActive={ this.props.modal_status.is_signup_open }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { modal_status: state.modal_status };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleSigninModal, toggleSignupModal }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));