import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditorSidebar extends Component {
	constructor(props) {
		super(props);
	}

	onDisplay = articleArr => {
		return (
			articleArr.map(article => {
				<a onClick={article => this.props.updateCurrentEditorArticle(article)} key={article.articleID} class="t4t-editable-article">
					<h3> {article.title ? article.title : "untitled article"} </h3>
					<p> {article.is_published ? "Draft" : "Published"} </p>
				</a>
            })
		);
	}

	onEmpty = () => {
		return (
			<div className="no-articles">
				<p> No articles found... </p>
			</div>
		);
	}

	render() {
		return (
			<div id="t4t-editor-sidebar">
				<h3 className="title"> My Latest Articles </h3>
				<div className="inner">
					{ this.props.user_owned.length != 0 ? this.onDisplay(this.props.user_owned) : this.onEmpty() }
				</div>
			</div>
		)
	}
}

EditorSidebar.propTypes = {
	user_owned: PropTypes.array.isRequired,
	updateCurrentEditorArticle: PropTypes.func.isRequired
};

export default EditorSidebar;