import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class T4TEditor extends Component {
	constructor(props) {
		super(props);

		this.debouncedPostUpdatedArticle = _.debounce(this.postUpdatedArticle, 1500);
	}

	postUpdatedArticle = () => {
		const isArticleActive = this.props.articleId !== -1;
		const currentEditorContent = this.props.editorState.getCurrentContent();
		this.props.toggleArticleAutosavingState();

		if (isArticleActive || currentEditorContent.hasText()) {
			fetch('/api/article/' + (isArticleActive ? 'save-article' : 'store-article'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					articleId: this.props.articleId,
					keyToUpdate: 'contentState',
					content: JSON.stringify(convertToRaw(currentEditorContent)),
				})
			})
				.then(res => res.json())
				.then(json => {
					if (!isArticleActive) this.props.updateArticleId(parseInt(json.info, 10));
					this.props.toggleArticleAutosavingState();
					return json;
				})
				.then(json => {
					this.props.fetchUserArticles();
					return json;
				})
				.catch(err => console.error('Error: ', err));
		}
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
					toolbar={{
						options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link',],
						inline: { options: ['bold', 'italic', 'underline', 'strikethrough',] },
					}}
				/>
			</div>
		)
	}
}

T4TEditor.propTypes = {
	isAutosaving: PropTypes.bool,
	articleId: PropTypes.number,
	editorState: PropTypes.object,
	fetchUserArticles: PropTypes.func,
	toggleArticleAutosavingState: PropTypes.func,
	updateArticleId: PropTypes.func,
	updateEditorState: PropTypes.func,
};

export default T4TEditor;