import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Redux - Selectors */
import { getCurrentlyReading } from '../../redux/selectors/articles.selector';
/* Redux - Actions */
import { fetchArticleByID } from '../../redux/actions/articles.action';

/* Components */
import Navbar from "../../components/Navbar/Navbar";
import ArticleLoad from "./components/ArticleLoad.js";
import ArticleView from "./components/ArticleView.js";

/* Styles */
import './Article.less';

class Article extends Component {
	componentDidMount() {
		this.props.fetchArticleByID(this.props.match.params.id);
	}

	render() {
		return(
			<>
				<Navbar isLoggedIn />
				<main id="content" className="article">
					{ !Object.keys(this.props.currentlyReading).length ? <ArticleLoad /> : <ArticleView article={ this.props.currentlyReading } /> }
				</main>
			</>
		)
	}
}

Article.propTypes = {
	currentlyReading: PropTypes.object,
	fetchArticleByID: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ currentlyReading: getCurrentlyReading(state) });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchArticleByID }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Article);