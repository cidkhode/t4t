import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton.js';
import SubmissionForm from './SubmissionForm.js';

/* Redux - Selectors */
import { getUserAccountDetails } from '../../../redux/selectors/user.selector';
import { getCurrentArticleTitle, getCurrentArticleId } from '../../../redux/selectors/t4teditor.selector';

/* Styles */
import '../ModalSkeleton.less';
import './ArticleSubmission.less';


class ArticleSubmission extends PureComponent {
	render(){
		return(
			<ModalSkeleton isActive={ this.props.isActive }>
				<div id="signup-container" className="modal-content">
					<span onClick={ this.props.closeModal } className="closeModal" />
					<SubmissionForm
						user={ this.props.user }
						articleId={ this.props.articleId }
						articleTitle={ this.props.articleTitle }
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
	user: getUserAccountDetails(state),
});

// const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps)(ArticleSubmission);