import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DOMPurify from 'dompurify';
import Sidebar from "../../../components/Sidebar/Sidebar";

class ArticleView extends Component {
	render() {
		const { userEmail, title, contentState, thumbnailImageURL } = this.props.article;
		return(
			<div id="article-view">
				<div className="inner">
					<div className="article-user-content">
						<div className="header">
							{ thumbnailImageURL !== null ? <div className="img-container"> <img src={ thumbnailImageURL } /> </div> : <></> }
							<h1> { title } </h1>
							<p className="user-ident"> By { userEmail } </p>
						</div>
						<div className="article-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(stateToHTML(convertFromRaw(JSON.parse(contentState)))) }} />
					</div>

					<div className="article-sidebar"></div>
				</div>
			</div>
		)
	}
}

ArticleView.propTypes = {
	article: PropTypes.object,
};

export default ArticleView;