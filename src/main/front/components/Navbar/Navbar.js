import React, {Component} from 'react';
import Button from "../Button/Button";
import Signin from "../Modal/Signin/Signin";
import Signup from "../Modal/Signup/Signup";
import Searchbar from '../Searchbar/Searchbar';
import './Navbar.less';
import { POPUP_KEYS } from '../../utils/constants';
import searchImg from '../../assets/search.png'


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [POPUP_KEYS.loginPopupOpen]: false,
      [POPUP_KEYS.signupPopupOpen]: false,
      searchText: '',
    }
  }

  togglePopup = (key, isOpen) => {
    this.setState({ [key]: isOpen });
  };

  onSearchInputChange = e => {
    const { target } = e;
    this.setState({ searchText: target.value });
  };

  onSearch = () => {
    console.log(`Searching for: `, this.state.searchText);
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
            handleClick={ () => this.togglePopup(POPUP_KEYS.loginPopupOpen, !this.state[POPUP_KEYS.loginPopupOpen]) }
            text="Log in"
          />
          <Button
            extraClass="nav-bar-sign-up-button"
            handleClick={ () => this.togglePopup(POPUP_KEYS.loginPopupOpen, !this.state[POPUP_KEYS.loginPopupOpen]) }
            text="Register!"
          />
          <Signin
            closeSignin={ () => this.togglePopup(POPUP_KEYS.loginPopupOpen, !this.state[POPUP_KEYS.loginPopupOpen]) }
            isActive={ this.state[POPUP_KEYS.loginPopupOpen] }
          />
          <Signup
            closeSignup={ () => this.togglePopup(POPUP_KEYS.signupPopupOpen, !this.state[POPUP_KEYS.signupPopupOpen]) }
            isActive={ this.state[POPUP_KEYS.signupPopupOpen] }
          />
        </div>
      </div>
    );
  }
}
export default Navbar;