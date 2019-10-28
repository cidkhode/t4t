import React, {Component} from 'react';
import Button from "../Button/Button";
import Signin from "../Modal/Signin/Signin";
import Signup from "../Modal/Signup/Signup";
import Searchbar from '../Searchbar/Searchbar';
import './Navbar.less';
import { POPUP_KEYS, LOCAL_STORAGE_KEYS } from '../../utils/constants';
import searchImg from '../../assets/search.png'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [POPUP_KEYS.LOGIN_POPUP_OPEN]: false,
      [POPUP_KEYS.SIGNUP_POPUP_OPEN]: false,
      searchText: '',
    }
  }

  togglePopup = (key, isOpen) => {
    this.setState({ [key]: isOpen }, () => {
      console.log(`KEY`, key, isOpen)
    });
  };

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
          this.togglePopup(POPUP_KEYS.LOGIN_POPUP_OPEN, false);
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
            handleClick={ () => this.togglePopup(POPUP_KEYS.LOGIN_POPUP_OPEN, !this.state[POPUP_KEYS.LOGIN_POPUP_OPEN]) }
            text="Log in"
          />
          <Button
            extraClass="nav-bar-sign-up-button"
            handleClick={ () => this.togglePopup(POPUP_KEYS.SIGNUP_POPUP_OPEN, !this.state[POPUP_KEYS.SIGNUP_POPUP_OPEN]) }
            text="Register!"
          />
          <Signin
            sendLogin={ this.sendLogin }
            closeSignin={ () => this.togglePopup(POPUP_KEYS.LOGIN_POPUP_OPEN, !this.state[POPUP_KEYS.LOGIN_POPUP_OPEN]) }
            isActive={ this.state[POPUP_KEYS.LOGIN_POPUP_OPEN] }
          />
          <Signup
            closeSignup={ () => this.togglePopup(POPUP_KEYS.SIGNUP_POPUP_OPEN, !this.state[POPUP_KEYS.SIGNUP_POPUP_OPEN]) }
            isActive={ this.state[POPUP_KEYS.SIGNUP_POPUP_OPEN] }
          />
        </div>
      </div>
    );
  }
}
export default Navbar;