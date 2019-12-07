import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Redux - Actions */
import { fetchArticleByID } from '../../redux/actions/articles.action';
/* Redux - Selectors */
import { getCurrentlyReading } from '../../redux/selectors/articles.selector';

/* Components */
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ArticleLoad from "./components/ArticleLoad.js";
import ArticleView from "./components/ArticleView.js";

/* Styles */
import './Article.less';
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

class Article extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			sideBarOpen: false,
		}
	}
	componentDidMount() {
		console.log(`PROPS`, this.props);
		this.props.fetchArticleByID(this.props.match.params.id);
	}

	openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

	selectTopic = (selectedSideBarOption) => this.setState({ sideBarOpen: false, selectedSideBarOption });

	render() {
		return(
			<>
				<Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } />
				<main id="content" className="article">
					{ !Object.keys(this.props.currentlyReading).length ? <LoadingIcon /> : <ArticleView article={ this.props.currentlyReading } /> }
				</main>
				{ this.props.showSidebar &&
				<Sidebar
					topics={ this.props.userAccountDetails.topics ? this.props.userAccountDetails.topics : this.fetchTopics() }
					onTopicSelection={ this.selectTopic }
					onOpen={ this.openSideBar }
					name={ this.props.userAccountDetails.name }
					isOpen={ this.state.sideBarOpen }
					selectedOption={ this.state.selectedSideBarOption }
				/> }
			</>
		)
	}
}

Article.propTypes = {
	currentlyReading: PropTypes.object.isRequired,
	fetchArticleByID: PropTypes.func.isRequired,
	showSidebar: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ currentlyReading: getCurrentlyReading(state) });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchArticleByID }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Article);