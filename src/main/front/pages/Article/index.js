import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Redux - Actions */
import { fetchArticleByID } from '../../redux/actions/articles.action';
/* Redux - Selectors */
import { getCurrentlyReading } from '../../redux/selectors/articles.selector';

/* Components */
import Navbar from '../../components/Navbar/Navbar';
import ArticleLoad from './components/ArticleLoad.js';
import ArticleView from './components/ArticleView.js';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { Sidebar } from '../../components/Sidebar/Sidebar';

/* Styles */
import './Article.less';

class Article extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			sideBarOpen: false,
			selectedSideBarOption: '',
		}
	}
	componentDidMount() {
		console.log(`PROPS`, this.props);
		this.props.fetchArticleByID(this.props.match.params.id);
	}

	openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

	selectTopic = selectedSideBarOption => this.setState({ sideBarOpen: false, selectedSideBarOption });

	render() {
		return(
			<>
				<Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } />
				{ this.props.isLoggedIn ?
					<Sidebar
						topics={ this.props.userAccountDetails.topics }
						onTopicSelection={ this.selectTopic }
						onOpen={ this.openSideBar }
						name={ this.props.userAccountDetails.name }
						isOpen={ this.state.sideBarOpen }
						selectedOption={ this.state.selectedSideBarOption }
					/> : <></>
				}
				<main id="content" className="article">
					{ !Object.keys(this.props.currentlyReading).length ? <LoadingIcon /> : <ArticleView article={ this.props.currentlyReading } /> }
				</main>
			</>
		)
	}
}

Article.propTypes = {
	currentlyReading: PropTypes.object.isRequired,
	fetchArticleByID: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ currentlyReading: getCurrentlyReading(state) });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchArticleByID }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Article);