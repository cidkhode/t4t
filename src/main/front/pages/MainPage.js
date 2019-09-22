import React, { Component } from 'react';
import Button from "../components/Button/Button";
export class MainPage extends Component {

  handleButtonClick = () => {
    console.log(`Button clicked!`);
    fetch('/api/articles', { credentials: 'same-origin' })
      .then(response => response.json())
      .then( json => console.log(`Response data`, json))
  };

  render() {
    return (
      <div>
        <Button handleClick={ this.handleButtonClick } text="Sample button" />
      </div>
    )
  }
}

export default MainPage;