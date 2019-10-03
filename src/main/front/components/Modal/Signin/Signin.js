import React, { Component } from 'react';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton';
import SigninForm from './components/SigninForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './Signin.less';


class Signin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ModalSkeleton isActive={this.props.isActive}>
				<div id="signin-container" className="modal-content">
					<span className="closeModal" />
					<div className="inner">
						<h3> Welcome Back </h3>
						<SigninForm />

						<div className="link-group">
							<a href="#"> Sign up </a>
							<a href="#"> Forgot password </a>
						</div>
					</div>
				</div>
			</ModalSkeleton>
		)
	}
}

export default Signin;