import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DELETE_FROM_USER_ARTICLE_LIST} from "../../../redux/actions/articles.action";

class EditorSidebar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchUserArticles();
	}

	onDisplay = () => {
		return (
			this.props.userOwned.map(article => {
				const { articleID, title, description, contentState, isPublished } = article;
				return (
					<div key={ articleID } className="t4t-editable-article">
						<div onClick={ () => this.props.deleteFromUserArticlesList(articleID, this.props.articleId) } className="t4t-article-delete">Delete</div>
						<a onClick={ () => this.props.updateCurrentEditorArticle({ id: articleID, title, description, contentState }) } className="t4t-article-content">
							<h3>{title ? title : "untitled article"}</h3>
							<p>{description ? description : <i>No description available...</i>}</p>
							<p>{!isPublished ? <i>Draft</i> : <strong>Published</strong>}</p>
						</a>
					</div>
				)
			}).reverse()
		)
	};

	onEmpty = () => {
		return (
			<div className="no-articles">
				<p> No articles found... </p>
			</div>
		);
	};

	render() {
		return (
			<div id="t4t-editor-sidebar">
				<h3 className="title"> My Latest Articles </h3>
				<div className="inner">
					{ this.props.userOwned.length !== 0 ? this.onDisplay() : this.onEmpty() }
				</div>
			</div>
		)
	}
}

EditorSidebar.propTypes = {
	userOwned: PropTypes.array.isRequired,
	deleteFromUserArticlesList: PropTypes.func.isRequired,
	updateCurrentEditorArticle: PropTypes.func.isRequired,
	fetchUserArticles: PropTypes.func.isRequired,
};

export default EditorSidebar;