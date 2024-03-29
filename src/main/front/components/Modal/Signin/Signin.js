import React  from 'react';
import { bool, func } from 'prop-types';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton.js';
import SigninForm from './components/SigninForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './Signin.less';

const Signin = props => (
	<ModalSkeleton isActive={ props.isActive }>
		<div className="signin-container modal-content">
			<span onClick={ props.closeSignin } className="closeModal" />
			<div className="inner">
				<h3> Welcome Back </h3>
				<SigninForm sendLogin={ props.sendLogin }/>

				<div className="link-group">
					<a href="#"> Sign up </a>
					<a href="#"> Forgot password </a>
				</div>
			</div>
		</div>
	</ModalSkeleton>
);

Signin.propTypes = {
	isActive: bool.isRequired,
	closeSignin: func.isRequired,
	sendLogin: func.isRequired,
};

export default Signin;