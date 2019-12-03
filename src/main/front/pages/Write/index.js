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
	getIsSubmitting,
	getIsAutosaving,
	getCurrentArticleTitle,
	getEditorState,
	getCurrentArticleId,
	getCurrentArticleDescription,
} from '../../redux/selectors/t4teditor.selector';
/* Redux - Actions */
import { togglePopup } from '../../redux/actions/popup.action';
import {
	updateUserArticlesList,
	updateUserArticlesListItemTitle,
	updateUserArticlesListItemDescription,
	deleteFromUserArticlesList,
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
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(`UPDATING: `, this.props.user);
	}

	fetchUserArticles = () => {
		fetch(`/api/article/get-user-articles?userEmail=${this.props.user.email}`, { headers: { 'Content-Type': 'application/json' }})
			.then(res => res.json())
			.then(json => this.props.updateUserArticlesList(json))
			.catch(err => console.error('Error: ', err));
	}

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

						resetT4TEditor={ this.props.resetT4TEditor }
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
							isSubmitting={ this.props.isSubmitting }
							user={ this.props.user }
							articleId={ this.props.articleId }
							toggleEditorSubmitState={ this.props.toggleEditorSubmitState }
							toggleArticleAutosavingState={ this.props.toggleArticleAutosavingState }
							updateArticleId={ this.props.updateArticleId }
							editorState={ this.props.editorState }
							updateEditorState={ this.props.updateEditorState }
							fetchUserArticles={ this.fetchUserArticles }
						/>

						<EditorSidebar
							user_owned={ this.props.user_owned_articles }

							fetchUserArticles={ this.fetchUserArticles }
							deleteFromUserArticlesList={ this.props.deleteFromUserArticlesList }
							updateCurrentEditorArticle={ this.props.updateCurrentEditorArticle }
						/>
					</div>
				</main>
			</>
		)
	}
}


const mapStateToProps = state => ({
	isSubmitting: getIsSubmitting(state),
	isAutosaving: getIsAutosaving(state),
	articleTitle: getCurrentArticleTitle(state),
	articleDescription: getCurrentArticleDescription(state),
	editorState: getEditorState(state),
	articleId: getCurrentArticleId(state),
	user: getUserAccountDetails(state),
	user_owned_articles: getUserArticles(state),
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
	updateUserArticlesList,
	updateUserArticlesListItemTitle,
	updateUserArticlesListItemDescription,
	deleteFromUserArticlesList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Write);