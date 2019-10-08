import React, { Component } from 'react';
import Navbar from "../components/HeaderBar/HeaderBar";
import MostPopular from "../components/MostPopular";
import Section from "../components/Section/Section";

export class MainPage extends Component {

  handleButtonClick = () => {
    console.log(`Button clicked!`);
    fetch('/api/articles', { credentials: 'same-origin' })
      .then(response => response.json())
      .then( json => console.log(`Response data`, json))
  };

  render() {
    return (
      <div style={{minWidth: "1440px", margin: 0}}>
        <Navbar />
        <h1 className="popular">Most Popular Today</h1>
        <MostPopular />
        <h1 className="reading">Your Reading List</h1>
        <Section type={"readinglist"} condensed={6} />
        <h1 className="network">News From Your Network</h1>
        <Section type={"networknews"} author={2} />
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