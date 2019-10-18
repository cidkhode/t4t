import React, { Component } from 'react';
import HeaderBar from "../components/HeaderBar/HeaderBar";
import Section from "../components/Section/Section";

export class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popular: 4,
      author: 3
    }
  }

  handleButtonClick = () => {
    console.log(`Button clicked!`);
    fetch('/api/articles', { credentials: 'same-origin' })
      .then(response => response.json())
      .then( json => console.log(`Response data`, json))
  };

  updateDimensions() {
    console.log(window.innerWidth);
    if(window.innerWidth <= 1500) {
      this.setState({
        author: 2, popular: 2
      });
    } else if (window.innerWidth >= 1501) {
      this.setState({
        author: 3, popular: 4
      });
    }
    console.log(this.state.author + " " + this.state.popular)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <div style={{minWidth: "1440px", margin: 0}}>
        <HeaderBar />
        <h1 className="popular">Most Popular Today</h1>
        <div className="mostpopular">
          <Section type={"leftPrev"} condensed={3}/>
          <Section type={"rightPrev"} larger={this.state.popular}/>
        </div>
        <h1 className="reading">Your Reading List</h1>
        <Section type={"readinglist"} condensed={6} />
        <h1 className="network">News From Your Network</h1>
        <Section type={"networknews"} author={this.state.author} />
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