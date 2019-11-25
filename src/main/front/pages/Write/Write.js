import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Components */
import ArticleSubmission from "../../components/Modal/ArticleSubmission/ArticleSubmission";
import T4TEditor from "../../components/Editor/T4TEditor";
import Navbar from "../../components/Navbar/Navbar";
import Opsbar from "./Opsbar.js";

/* Redux - Selectors */
import { getUserAccountDetails } from '../../redux/selectors/user.selector';
import { getPopupActive, getPopupType } from '../../redux/selectors/popup.selector';
import { getIsSubmitting, getCurrentArticleTitle, getEditorState, getCurrentArticleId } from '../../redux/selectors/t4teditor.selector';
/* Redux - Actions */
import { togglePopup } from '../../redux/actions/popup.action';
import { toggleEditorSubmitState, updateArticleTitle, updateEditorState, updateArticleId } from '../../redux/actions/t4teditor.action';

/*  */
import { POPUP_KEYS } from '../../utils/constants';

/* Styles */
import './Write.less';

class Write extends PureComponent {
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(`UPDATING: `, this.props.user);
	}

	render() {
		return(
			<>
				<Navbar />
				<main id="content" className="new-article">
					<ArticleSubmission
						closeModal={ () => this.props.togglePopup(POPUP_KEYS.ARTICLE_SUBMISSION) }
						isActive={ (this.props.popupType === POPUP_KEYS.ARTICLE_SUBMISSION) && this.props.isPopupActive }
					/>
					<Opsbar
						isSubmitting={ this.props.isSubmitting }
						user={ this.props.user }
						articleId={ this.props.articleId }
						toggleEditorSubmitState={ this.props.toggleEditorSubmitState }
						updateArticleId={ this.props.updateArticleId }

						articleTitle={ this.props.articleTitle }
						updateArticleTitle={ this.props.updateArticleTitle }
						toggleSubmission={ () => this.props.togglePopup(POPUP_KEYS.ARTICLE_SUBMISSION) }
					/>
					<T4TEditor
						isSubmitting={ this.props.isSubmitting }
						user={ this.props.user }
						articleId={ this.props.articleId }
						toggleEditorSubmitState={ this.props.toggleEditorSubmitState }
						updateArticleId={ this.props.updateArticleId }
						editorState={ this.props.editorState }
						updateEditorState={ this.props.updateEditorState }
					/>
				</main>
			</>
		)
	}
}


const mapStateToProps = state => ({
	isSubmitting: getIsSubmitting(state),
	articleTitle: getCurrentArticleTitle(state),
	editorState: getEditorState(state),
	articleId: getCurrentArticleId(state),
	user: getUserAccountDetails(state),
	isPopupActive: getPopupActive(state),
	popupType: getPopupType(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
	toggleEditorSubmitState,
	updateArticleTitle,
	updateEditorState,
	updateArticleId,
	togglePopup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Write);