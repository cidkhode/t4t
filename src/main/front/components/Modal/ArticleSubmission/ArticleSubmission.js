import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton.js';
import SubmissionForm from './SubmissionForm.js';

/* Redux - Selectors */
import { getCurrentArticleTitle, getCurrentArticleId } from '../../../redux/selectors/t4teditor.selector';

/* Styles */
import '../ModalSkeleton.less';
import './ArticleSubmission.less';

class ArticleSubmission extends PureComponent {
	render(){
		return(
			<ModalSkeleton isActive={ this.props.isActive }>
				<div id="publish-container" className="modal-content">
					<span onClick={ this.props.closeModal } className="closeModal" />
					<SubmissionForm
						articleId={ this.props.articleId }
						articleTitle={ this.props.articleTitle }
						closeModal={ this.props.closeModal }
					/>
				</div>
			</ModalSkeleton>
		)
	}
}

ArticleSubmission.propTypes = {
	isActive: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	articleTitle: getCurrentArticleTitle(state),
	articleId: getCurrentArticleId(state),
});

export default connect(mapStateToProps)(ArticleSubmission);