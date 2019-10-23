import React from 'react';
import { array } from 'prop-types';

/* Styles */
import './Account.less';

const Account = props => (
	<div id="dashboard-account" className="dashboard-page">
		<div id="account-user-info">
			<p className="account-name"> Account Name </p>
			<p className="account-email"> Email </p>
			<p className="account-about"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
		</div>

		<div id="account-article-saved" className="article-container">
			<h3> Saved Articles </h3>

			<div className="inner">
				{props.articles}
			</div>
		</div>

		<div id="account-following">
			<h3> Following </h3>

			<div className="inner">
				{props.following}
			</div>
		</div>

		<div className="article-topics">
			<p className="topic active"> All Articles (17) </p>
			<p className="topic"> Topic A (10) </p>
			<p className="topic"> Topic B (3) </p>
			<p className="topic"> Topic C (4) </p>
		</div>
	</div>
);

Account.propTypes = {
	articles: array.isRequired,
	following: array.isRequired,
};

export default Account;