import React from 'react';
import { bool, func } from 'prop-types';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton.js';
import SignupForm from './components/SignupForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './Signup.less';

const Signup = props => (
	<ModalSkeleton isActive={props.isActive}>
		<div id="signup-container" className="modal-content">
			<span onClick={ props.closeSignup } className="closeModal" />
			<SignupForm />
		</div>
	</ModalSkeleton>
);

Signup.propTypes = {
	isActive: bool.isRequired,
	closeSignup: func.isRequired,
};

export default Signup;