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

	deleteArticleFromListById = (id) => {
		return fetch('/api/article/delete-article', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				articleId: id,
			}).then(resp => resp.json())
				.then(json => {
					console.log(`FETCH WORKED`)
					if (json.code === 0) {
						this.props.deleteFromUserArticlesList(id);
					}
				}).catch(error => console.error(`Couldn't delete article: `, id, `. Error: `, error))
		});
	};

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
						<div onClick={ () => this.props.deleteFromUserArticlesList(reduxArticle.id) } className="t4t-article-delete">Delete</div>
						<a onClick={ () => this.props.updateCurrentEditorArticle(reduxArticle) } className="t4t-article-content">
							<h3>{article.title ? article.title : "untitled article"}</h3>
							<p>{article.description ? article.description : <i>No description available...</i>}</p>
							<p>{!article.is_published ? <i>Draft</i> : <strong>Published</strong>}</p>
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