import React, { Component } from 'react';
import { array, bool, func, string } from 'prop-types';
import './Account.less';
import Button from "../../Button/Button";

export default class AccountView extends Component {
	constructor(props) {
		super(props);
		this.aboutMeRef = React.createRef();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.aboutMeRef.current.focus();
	}

	render() {
		return (
			<div id="dashboard-account" className="dashboard-page">
				<div id="account-user-info">
					<p className="account-name">{this.props.userAccountDetails.name}</p>
					<p className="account-email">{this.props.userAccountDetails.email}</p>
					<input
						ref={ this.aboutMeRef }
						type="text"
						value={ this.props.currentAbout }
						className="account-about"
						id="aboutMe"
						disabled={ !this.props.editMode }
						onChange={ this.props.onChangeHandler }
					/>
					<div className="about-me-button-controllers">
						<Button
							extraClass="edit-about-me-button"
							handleClick={ () => this.props.toggleAboutMeEditMode(this.props.editMode ? 'Submit' : 'Edit') }
							text={ this.props.editMode ? 'Save Changes' : 'Edit Description' }
						/>
						<Button
							disabled={ !this.props.editMode }
							extraClass={ `cancel-editing-about-me-button ${!this.props.editMode ? 'disabled' : '' }` }
							handleClick={ () => this.props.toggleAboutMeEditMode('Cancel') }
							text="Cancel"
						/>
					</div>
				</div>

				<div id="account-article-saved" className="article-container">
					<h3> Saved Articles </h3>
					<div className="inner">
						{
							this.props.savedArticles && this.props.savedArticles.map((article, key) => (
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
							this.props.followingUsers && this.props.followingUsers.map((followingUser, key) => (
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
	}
}
AccountView.propTypes = {
	savedArticles: array.isRequired,
	followingUsers: array.isRequired,
	editMode: bool.isRequired,
	onChangeHandler: func.isRequired,
	currentAbout: string,
	toggleAboutMeEditMode: func.isRequired,
};

AccountView.defaultProps = {
	currentAbout: '',
};
