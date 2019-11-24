import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // translate  draft-js compatable format to html
// import htmlToDraft from 'html-to-draftjs'; // translate server saved html to draft-js compatable format

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class T4TEditor extends Component {
	constructor(props) {
		super(props);

		this.debouncedPostUpdatedArticle = _.debounce(this.postUpdatedArticle, 1500);
	}

	postUpdatedArticle = () => {
		console.log(draftToHtml(convertToRaw(this.props.editorState.getCurrentContent())));
		console.log(`Id of article is:`, this.props.articleId);
		const savingArticle = this.props.articleId !== null;
		const post_article_url = '/api/article/' + (savingArticle ? 'save-article' : 'store-article');
		fetch(post_article_url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: this.props.user.email,
					articleId: this.props.articleId,
					articleKey: 'articleText',
					content: draftToHtml(convertToRaw(this.props.editorState.getCurrentContent()))
				})
			})
			.then(res => res.json())
			.then(json => {
				if (!savingArticle) {
					this.props.updateArticleId(json.info);
				}
			})
			.catch(err => console.error('Error: ', err));
	};

	onEditorStateChange = editorState => {
		this.props.updateEditorState(editorState);
		this.debouncedPostUpdatedArticle();
	};

	render() {
		return (
			<div id="t4t-editor-wrapper">
				<Editor
					editorState={this.props.editorState}
					onEditorStateChange={this.onEditorStateChange}
					placeholder="type out your thoughts..."
				/>
			</div>
		)
	}
}

T4TEditor.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired,
  articleId: PropTypes.number,
  user: PropTypes.object,
};

export default T4TEditor;