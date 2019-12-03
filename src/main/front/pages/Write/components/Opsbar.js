import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from "../../../components/Button/Button";

class Opsbar extends Component {
	constructor(props) {
		super(props);
		this.editArticlePicRef = null;
		this.debouncedPostUpdatedTitle = _.debounce(this.postUpdatedTitle, 1000);
		this.debouncedPostUpdatedDescription = _.debounce(this.postUpdatedDescription, 1000);
	}

	onTitleChange = event => {
		this.props.updateArticleTitle(event.target.value);
		this.debouncedPostUpdatedTitle();
	};

	postUpdatedTitle = () => {
		const isArticleActive = this.props.articleId !== -1;
		this.props.toggleArticleAutosavingState();

		fetch('/api/article/' + (isArticleActive ? 'save-article' : 'store-article'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				articleId: this.props.articleId,
				keyToUpdate: 'articleTitle',
				content: this.props.articleTitle
			})
		})
			.then(res => res.json())
			.then(json => {
				if (!isArticleActive) {
					this.props.updateArticleId(parseInt(json.info, 10));
				} else {
					this.props.updateUserArticlesListItemTitle(this.props.articleId, this.props.articleTitle);
				}

				this.props.toggleArticleAutosavingState();
				return json;
			})
			.then(json => {
				if (!isArticleActive) this.props.fetchUserArticles();
				return json;
			})
			.catch(err => console.error('Error: ', err));
	};

	onDescriptionChange = event => {
		this.props.updateArticleDescription(event.target.value);
		this.debouncedPostUpdatedDescription();
	};

	postUpdatedDescription = () => {
		const isArticleActive = this.props.articleId !== -1;
		this.props.toggleArticleAutosavingState();

		fetch('/api/article/' + (isArticleActive ? 'save-article' : 'store-article'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				articleId: this.props.articleId,
				keyToUpdate: 'articleDescription',
				content: this.props.articleDescription
			})
		})
			.then(res => res.json())
			.then(json => {
				if (!isArticleActive) {
					this.props.updateArticleId(parseInt(json.info, 10));
				} else {
					this.props.updateUserArticlesListItemDescription(this.props.articleId, this.props.articleDescription);
				}

				this.props.toggleArticleAutosavingState();
				return json;
			})
			.then(json => {
				if (!isArticleActive) this.props.fetchUserArticles();
				return json;
			})
			.catch(err => console.error('Error: ', err));
	};

	editArticlePic = () => {
		this.editArticlePicRef.click();
	};

	submitArticlePicture = (e) => {
		const data = new FormData();
		data.append('file', e.target.files[0]);
		data.append("articleId", this.props.articleId.toString());
		fetch('/api/storage/upload-article-thumbnail', {
			method: 'post',
			body: data,
		})
		.then(resp => resp.json())
		.then(json => {
			if (json.status === 0) {
				this.props.getProfile();
				this.setState({editing: false});
			}
		});
	};

	setAutosaveStatus = () => {
		if (this.props.isAutosaving && this.props.articleId === -1) {
			return `Creating article...`;

		} else if (this.props.isAutosaving) {
			return `Autosaving...`;

		} else if (this.props.articleId !== -1) {
			return `Article was saved`;

		} else {
			return "New article opened"
		}
	};

	render(){
		return (
			<div id="t4t-title-wrapper">
				<div className="autosave-ops">
					<form>
						<input type="text" value={this.props.articleTitle} onChange={this.onTitleChange} name="title" placeholder="untitled article..." />
						<input type="text" value={this.props.articleDescription} onChange={this.onDescriptionChange} name="description" placeholder="article description..." />
					</form>
					<p className={this.props.isAutosaving ? `active autosave`:`autosave`}>{ this.setAutosaveStatus() }</p>
				</div>

				<div className="btn-group">
					<Button
						disabled={this.props.articleId === -1 || this.props.isAutosaving}
						extraClass="nav-bar-sign-in-button nav-bar-right-child"
						handleClick={ () => this.props.resetT4TEditor() }
						text="New Article"
					/>

					<Button
						disabled={this.props.articleId === -1 || this.props.isAutosaving}
						extraClass="nav-bar-sign-in-button nav-bar-right-child"
						handleClick={ this.editArticlePic }
						text="Upload Article Image"
					/>
					<input
						type="file"
						ref={ (ref) => this.editArticlePicRef = ref }
						style={ { display: 'none' } }
						onChange={ this.submitArticlePicture }
					/>

					<Button
						disabled={this.props.articleId === -1 || this.props.isAutosaving}
						extraClass="nav-bar-sign-in-button nav-bar-right-child"
						handleClick={ () => this.props.toggleSubmission() }
						text="Publish Article"
					/>
				</div>
			</div>
		)
	}
}

Opsbar.propTypes = {
	articleId: PropTypes.number.isRequired,
	articleTitle: PropTypes.string,
	articleDescription: PropTypes.string,
	resetT4TEditor: PropTypes.func.isRequired,
	updateArticleTitle: PropTypes.func.isRequired,
	updateArticleDescription: PropTypes.func.isRequired,
	updateUserArticlesListItemTitle: PropTypes.func.isRequired,
	updateUserArticlesListItemDescription: PropTypes.func.isRequired,
	toggleArticleAutosavingState: PropTypes.func.isRequired,
	toggleSubmission: PropTypes.func.isRequired,
};

export default Opsbar;