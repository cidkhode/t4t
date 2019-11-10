import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/* Styles */
import './index.css';

/* Redux Store */
import store from './redux/store.js';
import Thought from './pages/Thought';

export class Thought4Thought extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccountDetails: {}
    };
  }

  render() {
    return (
      <Provider store={ store }>
        <Thought />
      </Provider>
    )
  }
}

ReactDOM.render(<Thought4Thought />, document.getElementById('thought4thought-app'));