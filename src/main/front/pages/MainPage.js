import React, { Component } from 'react';

/* Components */
import Button from "../components/Button/Button";
import Signin from "../components/Modal/Signin/Signin";
import Signup from "../components/Modal/Signup/Signup";
import Sidebar from "../components/Sidebar/Sidebar";


class MainPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      signinOpen: false,
      signupOpen: false,
      sideBarOpen: false,
    };
  }

  toggleSignin = () => this.setState({ signinOpen: !this.state.signinOpen });
  toggleSignup = () => this.setState({ signupOpen: !this.state.signupOpen });
  openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

  render() {
    return (
      <div>
        <Sidebar onOpen={ this.openSideBar } name="Cid Khode" isOpen={ this.state.sideBarOpen }/>
        <Button handleClick={this.toggleSignin} text="Sign in" />
        <Button handleClick={this.toggleSignup} text="Sign up" />
        <Signin isActive={this.state.signinOpen} />
        <Signup isActive={this.state.signupOpen} />
      </div>
    )
  }
}

export default MainPage;