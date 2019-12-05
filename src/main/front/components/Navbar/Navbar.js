import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

/* Components */
import Button from "../Button/Button";
import Signin from "../Modal/Signin/Signin";
import Signup from "../Modal/Signup/Signup";
import Searchbar from '../Searchbar/Searchbar';

/* Redux Actions - Popup Toggles */
import { togglePopup } from '../../redux/actions/popup.action';
import { fetchUserAccountDetails } from '../../redux/actions/user.action';
import { getPopupActive, getPopupType } from '../../redux/selectors/popup.selector';

/* Images */
import searchImg from '../../assets/search.png'

import { POPUP_KEYS, LOCAL_STORAGE_KEYS } from '../../utils/constants';

/* Styles */
import './Navbar.less';

export class Navbar extends Component {
  static propTypes = {
    history: PropTypes.any,
    handleLogin: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    fetchUserAccountDetails: PropTypes.func.isRequired,
    togglePopup: PropTypes.func.isRequired,
    popupType: PropTypes.string.isRequired,
    isPopupActive: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    handleLogin: () => {},
    isLoggedIn: false,
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
    fetch('/api/article/search?filter=all&query=' + this.state.searchText, {
      method: 'GET'
    }).then(resp => resp.json())
    .then(json => {
      if(json) {
        console.log(json);
      }
    })
    .catch(error => console.error(error));
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
          this.props.togglePopup(POPUP_KEYS.LOGIN_POPUP);
          localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL, email);
          this.props.fetchUserAccountDetails(email);
        }
      })
      .catch(error => console.error("Something went wrong.", error));
  };

  render() {
    return (
      <div className="navhead">
        <Link to="/" className="navbar-left-floated-content">
          <button className="logo">LOGO</button>
        </Link>
        <div className="navbar-center-content">
          <Searchbar
              extraClass="navbar-search-bar nav-bar-right-child"
              searchInputValue={ this.state.searchText }
              onSearch={ this.onSearch }
              onSearchInputChange={ this.onSearchInputChange }
              searchIconPath={ searchImg }
            />
        </div>
        <div className="navbar-right-floated-content">
          { !this.props.isLoggedIn &&
            <>
              <Button
                extraClass="nav-bar-sign-in-button nav-bar-right-child"
                handleClick={ () => this.props.togglePopup(POPUP_KEYS.LOGIN_POPUP) }
                text="Log in"
              />
              <Button
                extraClass="nav-bar-sign-up-button"
                handleClick={() => this.props.togglePopup(POPUP_KEYS.SIGNUP_POPUP)}
                text="Register!"
              />
            </>
          }
          {
            this.props.isLoggedIn &&
            <Link to="/write">
              <Button
                extraClass="nav-bar-sign-up-button"
                handleClick={() => { }}
                text="Write"
              />
            </Link>
          }
          <Signin
            sendLogin={ this.sendLogin }
            closeSignin={ () => this.props.togglePopup(POPUP_KEYS.LOGIN_POPUP) }
            isActive={ (this.props.popupType === POPUP_KEYS.LOGIN_POPUP) && this.props.isPopupActive }
          />
          <Signup
            closeSignup={ () => this.props.togglePopup(POPUP_KEYS.SIGNUP_POPUP) }
            isActive={ (this.props.popupType === POPUP_KEYS.SIGNUP_POPUP) && this.props.isPopupActive }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isPopupActive: getPopupActive(state),
  popupType: getPopupType(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  togglePopup,
  fetchUserAccountDetails,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);