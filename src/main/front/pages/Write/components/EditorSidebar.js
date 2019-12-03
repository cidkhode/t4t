import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditorSidebar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchUserArticles();
	}

	deleteArticleFromListById = (id) => this.props.deleteFromUserArticlesList(id);

	onDisplay = () => {
		return(
			this.props.user_owned.map(article => {
				const reduxArticle = {
					id: article.articleID,
					title: article.title,
					description: article.description,
					text: article.articleText,
				}

				return(
					<div key={reduxArticle.id} className="t4t-editable-article">
						<a onClick={article => this.deleteArticleFromListById(reduxArticle.id)} className="t4t-article-delete">
							x
						</a>
						<a onClick={() => this.props.updateCurrentEditorArticle(reduxArticle)} className="content">
							<h3> {article.title ? article.title : "untitled article"} </h3>
							<p> {article.description ? article.description : <i>no description available...</i>} </p>
							<p> {!article.is_published ? "Draft" : "Published"} </p>
						</a>
					</div>
				)
			}).reverse()
		)
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
					{ this.props.user_owned.length != 0 ? this.onDisplay() : this.onEmpty() }
				</div>
			</div>
		)
	}
}

EditorSidebar.propTypes = {
	user_owned: PropTypes.array.isRequired,
	deleteFromUserArticlesList: PropTypes.func.isRequired,
	updateCurrentEditorArticle: PropTypes.func.isRequired,
	fetchUserArticles: PropTypes.func.isRequired,
};

export default EditorSidebar;