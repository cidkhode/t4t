import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from "../../components/Button/Button";

class Opsbar extends Component {
	constructor(props) {
		super(props);
		this.editArticlePicRef = null;
		this.debouncedPostUpdatedTitle = _.debounce(this.postUpdatedTitle, 1000);
	}

	postUpdatedTitle = () => console.log(this.props.articleTitle);

	onTitleChange = event => {
		this.props.updateArticleTitle(event.target.value);
		this.debouncedPostUpdatedTitle();
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
					<input type="text" value={this.props.articleTitle} onChange={this.onTitleChange} name="title" placeholder="untitled article..." />
				</form>

				<div className="btn-group">
					<Button
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
  articleId: PropTypes.string,
  user: PropTypes.object,
};

export default Opsbar;