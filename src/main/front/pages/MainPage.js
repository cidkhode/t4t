import React, { Component } from 'react';
import Button from "../components/Button/Button";
import Navbar from "../components/Navbar";
import MostPopular from "../components/MostPopular";
import ReadingList from "../components/ReadingList";
import NetworkNews from "../components/NetworkNews";

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
        <Navbar />
        <h1 className="popular">Most Popular Today</h1>
        <MostPopular />
        <h1 className="reading">Your Reading List</h1>
        <ReadingList />
        <h1 className="network">News From Your Network</h1>
        <NetworkNews />
      </div>
    )
  }
}

/*
      <div>
        <Button handleClick={ this.handleButtonClick } text="Sample button" />
      </div>
*/
export default MainPage;