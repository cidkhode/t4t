import React, { Component } from 'react';

/* Components */
import Button from "../components/Button/Button";
import Login from "../components/Modal/Login";


class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = { loginOpen: false };

    this.toggleLogin = this.toggleLogin.bind(this);
    console.log(this.state);
  }

  toggleLogin = () => {
    this.setState({ loginOpen: this.state.loginOpen ? false : true });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Button handleClick={this.toggleLogin} text="Login" />
        <Login isActive={this.state.loginOpen} />
      </div>
    )
  }
}

export default MainPage;