import React, { Component } from 'react';

import './Account.less';

class Account extends Component {
  constructor(props) {
    super(props);
  }

	getArticles = () => {
		let articles = [];

		for (let j = 0; j < 4; j++) {
			articles.push(
				<div className="article" key={j}>
					<div className="dashboard-img article-img">
						<img src="https://picsum.photos/450/285" />
					</div>

					<p className="article-title"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
				</div>
			)
		}

		return articles;
	}

	getFollowers = () => {
		let followers = [];

		for (let j = 0; j < 5; j++) {
			followers.push(
				<div className="following" key={j}>
					<div className="dashboard-img following-img">
						<img src="https://i.pravatar.cc/120" />
					</div>

					<p className="following-name"> John Doe </p>
				</div>
			)
		}

		return followers;
	}


  render() {
    return (
		<div id="dashboard-account">

			<div id="account-user-info">
				<p className="account-name"> Account Name </p>
				<p className="account-email"> Email </p>
				<p className="account-about"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
			</div>

			<div id="account-article-saved" className="account-slider">
				<h4> Saved Articles </h4>
				<div className="inner">
					{this.getArticles()}
				</div>
			</div>

			<div id="account-following" className="account-slider">
				<h4> Following </h4>
				<div className="inner">
					{this.getFollowers()}
				</div>
			</div>

			<div id="account-article-topics">
				<p className="topic active"> All Articles (17) </p>
				<p className="topic"> Topic A (10) </p>
				<p className="topic"> Topic B (3) </p>
				<p className="topic"> Topic C (4) </p>
			</div>			

    	</div>
    )
  }
}

export default Account;