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

  toggleSignin = () => this.setState({ signinOpen: !this.state.signinOpen });
  toggleSignup = () => this.setState({ signupOpen: !this.state.signupOpen });
  fetchTest = () => {
    fetch('/api/add?name=cid&email=test@email.com')
      .then(resp => console.log(`Successful adding!`, resp))
      .catch(error => console.error(`Something wrong happened...`, error));
  };

  getAllUsers = () => {
    fetch('/api/all')
      .then(resp => console.log(`All users`, resp))
      .catch(error => console.error(`Something went wrong trying to get all users`, error));
  };

  render() {
    return (
      <div>
        <Button handleClick={ this.toggleSignin } text="Log in" />
        <Button handleClick={ this.toggleSignup } text="Register" />
        <Button handleClick={ this.fetchTest } text="Add a user..." />
        <Button handleClick={ this.getAllUsers } text="Retrieve all" />
        <Signin isActive={this.state.signinOpen} />
        <Signup isActive={this.state.signupOpen} />
      </div>
    )
  }
}

export default MainPage;