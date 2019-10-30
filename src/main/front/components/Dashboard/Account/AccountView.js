import React from 'react';
import { array, bool } from 'prop-types';
import './Account.less';

const AccountView = props => (
	<div id="dashboard-account" className="dashboard-page">
		<div id="account-user-info">
			<p className="account-name">{props.userAccountDetails.name}</p>
			<p className="account-email">{props.userAccountDetails.email}</p>
			{props.editMode ? (<input type="text" value={props.userAccountDetails.about} className="account-about"/>) : (<p className="account-about">{props.userAccountDetails.about}</p>)}
		</div>

		<div id="account-article-saved" className="article-container">
			<h3> Saved Articles </h3>
			<div className="inner">
				{
					props.savedArticles.map((article, key) => (
						<div className="article" key={key}>
							<div className="dashboard-img article-img">
								<img src={ article.image } />
							</div>
							<p className="article-title">{article.title}</p>
						</div>
					))
				}
			</div>
		</div>

		<div id="account-following">
			<h3> Following </h3>
			<div className="inner">
				{
					props.followingUsers.map((followingUser, key) => (
						<div className="following" key={key}>
							<div className="dashboard-img following-img">
								<img src={ followingUser.followingUserImage } />
							</div>
							<p className="following-name">{followingUser.followingUserName}</p>
						</div>
					))
				}
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

AccountView.propTypes = {
	savedArticles: array.isRequired,
	followingUsers: array.isRequired,
	editMode: bool.isRequired,
};

export default AccountView;