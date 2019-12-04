import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Components */
import ArticleSubmission from "../../components/Modal/ArticleSubmission/ArticleSubmission";
import Navbar from "../../components/Navbar/Navbar";
import EditorSidebar from "./components/EditorSidebar.js";
import T4TEditor from "./components/T4TEditor";
import Opsbar from "./components/Opsbar.js";

/* Redux - Selectors */
import { getUserArticles } from '../../redux/selectors/articles.selector';
import { getUserAccountDetails } from '../../redux/selectors/user.selector';
import { getPopupActive, getPopupType } from '../../redux/selectors/popup.selector';
import {
	getIsAutosaving,
	getCurrentArticleTitle,
	getEditorState,
	getCurrentArticleId,
	getCurrentArticleDescription,
} from '../../redux/selectors/t4teditor.selector';
/* Redux - Actions */
import { togglePopup } from '../../redux/actions/popup.action';
import {
	updateUserArticlesListItemTitle,
	updateUserArticlesListItemDescription,
	deleteFromUserArticlesList,
	fetchUserArticles,
} from '../../redux/actions/articles.action';
import {
	resetT4TEditor,
	toggleEditorSubmitState,
	toggleArticleAutosavingState,
	updateArticleTitle,
	updateCurrentEditorArticle,
	updateArticleDescription,
	updateEditorState,
	updateArticleId,
} from '../../redux/actions/t4teditor.action';

/*  */
import { POPUP_KEYS } from '../../utils/constants';

/* Styles */
import './Write.less';

class Write extends PureComponent {
	fetchUserArticles = () => this.props.fetchUserArticles(this.props.user.email);

	render() {
		return(
			<>
				<Navbar isLoggedIn />
				<main id="content" className="new-article">
					<ArticleSubmission
						closeModal={ () => this.props.togglePopup(POPUP_KEYS.ARTICLE_SUBMISSION) }
						isActive={ (this.props.popupType === POPUP_KEYS.ARTICLE_SUBMISSION) && this.props.isPopupActive }
					/>
					<Opsbar
						isAutosaving={ this.props.isAutosaving }
						articleId={ this.props.articleId }
						articleTitle={ this.props.articleTitle }
						articleDescription={ this.props.articleDescription }
						fetchUserArticles={ this.fetchUserArticles }
						resetT4TEditor={ this.props.resetT4TEditor }
						updateArticleId={ this.props.updateArticleId }
						updateArticleTitle={ this.props.updateArticleTitle }
						updateArticleDescription={ this.props.updateArticleDescription }
						updateUserArticlesListItemTitle={ this.props.updateUserArticlesListItemTitle }
						updateUserArticlesListItemDescription={ this.props.updateUserArticlesListItemDescription }
						toggleArticleAutosavingState={ this.props.toggleArticleAutosavingState }
						toggleSubmission={ () => this.props.togglePopup(POPUP_KEYS.ARTICLE_SUBMISSION) }
					/>
					<div id="t4t-edit-wrapper">
						<T4TEditor
							isAutosaving={ this.props.isAutosaving }
							articleId={ this.props.articleId }							
							editorState={ this.props.editorState }
							fetchUserArticles={ this.fetchUserArticles }
							toggleArticleAutosavingState={ this.props.toggleArticleAutosavingState }
							updateArticleId={ this.props.updateArticleId }
							updateEditorState={ this.props.updateEditorState }
						/>
						<EditorSidebar
							articleId={ this.props.articleId }
							userOwned={ this.props.userOwnedArticles }
							fetchUserArticles={ this.fetchUserArticles }
							updateCurrentEditorArticle={ this.props.updateCurrentEditorArticle }
							deleteFromUserArticlesList={ this.props.deleteFromUserArticlesList }
						/>
					</div>
				</main>
			</>
		)
	}
}

Write.propTypes = {
	isAutosaving: PropTypes.bool,
	articleTitle: PropTypes.string,
	articleDescription: PropTypes.string,
	editorState: PropTypes.object,
	articleId: PropTypes.number,
	user: PropTypes.object,
	userOwnedArticles: PropTypes.array,
	isPopupActive: PropTypes.bool,
	popupType: PropTypes.string,
};

const mapStateToProps = state => ({
	isAutosaving: getIsAutosaving(state),
	articleTitle: getCurrentArticleTitle(state),
	articleDescription: getCurrentArticleDescription(state),
	editorState: getEditorState(state),
	articleId: getCurrentArticleId(state),
	user: getUserAccountDetails(state),
	userOwnedArticles: getUserArticles(state),
	isPopupActive: getPopupActive(state),
	popupType: getPopupType(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
	resetT4TEditor,
	toggleEditorSubmitState,
	toggleArticleAutosavingState,
	updateCurrentEditorArticle,
	updateArticleTitle,
	updateArticleDescription,
	updateEditorState,
	updateArticleId,
	togglePopup,
	updateUserArticlesListItemTitle,
	updateUserArticlesListItemDescription,
	deleteFromUserArticlesList,
	fetchUserArticles,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Write);