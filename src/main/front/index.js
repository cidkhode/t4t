import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './pages/MainPage';
import UserDashboard from './pages/UserDashboard';

export class Thought4Thought extends Component {
  render() {
    return (
		<div>
			{/* <MainPage /> */}
			<UserDashboard />
		</div>
    )
  }
}

ReactDOM.render(<Thought4Thought />, document.getElementById('thought4thought-app'));