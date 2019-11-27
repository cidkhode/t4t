import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from "../../components/Button/Button";

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
		if (this.props.articleId !== null) {
			fetch('/api/article/save-article', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					articleId: this.props.articleId,
					articleKey: 'articleTitle',
					content: this.props.articleTitle
				})
			})
			.catch(err => console.error('Error: ', err));
		}
	};

	onDescriptionChange = event => {
		this.props.updateArticleDescription(event.target.value);
		this.debouncedPostUpdatedDescription();
	};

	postUpdatedDescription = () => {
		if (this.props.articleId !== null) {
			fetch('/api/article/save-article', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					articleId: this.props.articleId,
					articleKey: 'articleDescription',
					content: this.props.articleDescription
				})
			})
			.catch(err => console.error('Error: ', err));
		}
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

	render(){
		return (
			<div id="t4t-title-wrapper">
				<form>
					<input type="text" value={this.props.articleTitle} onChange={this.onTitleChange} name="title" placeholder="untitled article..." disabled={this.props.articleId === null} />
					<input type="text" value={this.props.articleDescription} onChange={this.onDescriptionChange} name="description" placeholder="article description..." disabled={this.props.articleId === null} />
				</form>

				<div className="btn-group">
					<Button
						disabled={this.props.articleId === null}
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
						disabled={this.props.articleId === null}
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
	isSubmitting: PropTypes.bool.isRequired,
	articleTitle: PropTypes.string,
	articleDescription: PropTypes.string,
	articleId: PropTypes.string,
	user: PropTypes.object,
	updateArticleTitle: PropTypes.func,
	updateArticleDescription: PropTypes.func,
	toggleSubmission: PropTypes.func,
};

export default Opsbar;