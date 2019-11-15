import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // translate  draft-js compatable format to html
// import htmlToDraft from 'html-to-draftjs'; // translate server saved html to draft-js compatable format

import { getIsSubmitting, getEditorState, getCurrentArticleId } from '../../redux/selectors/t4teditor.selector';
import { toggleEditorSubmitState, updateEditorState, updateArticleId } from '../../redux/actions/t4teditor.action';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class T4TEditor extends Component {
	constructor(props) {
		super(props);

		this.debouncedPostUpdatedArticle = _.debounce(this.postUpdatedArticle, 1500);
	}

	postUpdatedArticle = () => console.log(draftToHtml(convertToRaw(this.props.editorState.getCurrentContent())));

	onEditorStateChange = editorState => {
		this.props.updateEditorState(editorState);
		this.debouncedPostUpdatedArticle();
	}

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
  editorState: PropTypes.object,
  articleId: PropTypes.number,
};

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
  editorState: getEditorState(state),
  articleId: getCurrentArticleId(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
	toggleEditorSubmitState,
	updateEditorState,
	updateArticleId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(T4TEditor);