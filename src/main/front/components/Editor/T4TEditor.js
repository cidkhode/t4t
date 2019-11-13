import React, { Component } from 'react';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html'; // translate  draft-js compatable format to html
// import htmlToDraft from 'html-to-draftjs'; // translate server saved html to draft-js compatable format

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class T4TEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createEmpty(),
		}
	}

	onEditorStateChange = (editorState) => this.setState({editorState});

	render() {
		return (
			<div id="t4t-editor-wrapper">
				<Editor
					editorClassName="t4t-editor"
					toolbarClassName="t4t-toolbar"
					placeholder="type out your thoughts..."
					editorState={this.state.editorState}
					onEditorStateChange={this.onEditorStateChange}
				/>
			</div>
		)
	}
}

export default T4TEditor;