import React, { Component } from 'react';

/* Components */
import Button from "../components/Button/Button";
import Login from "../components/Modal/Login";
import Signup from "../components/Modal/Signup";


class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signinOpen: false
    };

    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
  }

  toggleLogin = () => {
    this.setState({ loginOpen: this.state.loginOpen ? false : true });
  }

  toggleSignup = () => {
    this.setState({ signupOpen: this.state.signupOpen ? false : true });
  }

  render() {
    return (
      <div>
        <Button handleClick={this.toggleLogin} text="Log in" />
        <Button handleClick={this.toggleSignup} text="Sign up" />
        <Login isActive={this.state.loginOpen} />
        <Signup isActive={this.state.signupOpen} />
      </div>
    )
  }
}

export default MainPage;