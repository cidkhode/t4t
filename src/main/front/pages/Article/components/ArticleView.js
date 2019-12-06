import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArticleView extends Component {
	render() {
		return(
			<div id="article-view">
				<p> { this.props.article.articleID } </p>
				<p> { this.props.article.userEmail } </p>
				<p> { this.props.article.title } </p>
				<p> { this.props.article.description } </p>
				<p> { this.props.article.dateCreated } </p>
			</div>
		)
	}
}

ArticleView.propTypes = {
	article: PropTypes.object
}

export default ArticleView;