import React from 'react';
import { bool, func } from 'prop-types';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton.js';
import SubmissionForm from './SubmissionForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './ArticleSubmission.less';

const ArticleSubmission = props => (
	<ModalSkeleton isActive={props.isActive}>
		<div id="signup-container" className="modal-content">
			<span onClick={ props.closeModal } className="closeModal" />
			<SubmissionForm />
		</div>
	</ModalSkeleton>
);

ArticleSubmission.propTypes = {
	isActive: bool.isRequired,
	closeModal: func.isRequired,
};

export default ArticleSubmission;