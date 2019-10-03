import React, { Component } from 'react';

/* Components */
import Button from "../components/Button/Button";
import Signin from "../components/Modal/Signin/Signin";
import Signup from "../components/Modal/Signup/Signup";


class MainPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      signinOpen: false,
      signupOpen: false
    };
  }

  toggleSignin = () => this.setState({ signinOpen: this.state.signinOpen ? false : true });
  toggleSignup = () => this.setState({ signupOpen: this.state.signupOpen ? false : true });

  render() {
    return (
      <div>
        <Button handleClick={this.toggleSignin} text="Sign in" />
        <Button handleClick={this.toggleSignup} text="Sign up" />
        <Signin isActive={this.state.signinOpen} />
        <Signup isActive={this.state.signupOpen} />
      </div>
    )
  }
}

export default MainPage;