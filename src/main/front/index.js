import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './pages/MainPage';

export class Thought4Thought extends Component {
  render() {
    return (
      <MainPage />
    )
  }
}

ReactDOM.render(<Thought4Thought />, document.getElementById('thought4thought-app'));