import React, { Component } from 'react';

/* Components */
import ModalSkeleton from '../../Modal';
import SigninForm from './components/SigninForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './Signin.less';


class Signin extends Component {
	constructor(props) {
		super(props);

		this.toggleActive = this.toggleActive.bind(this);
	}

	toggleActive = () => {}

	render() {
		return(
			<ModalSkeleton isActive={this.props.isActive}>
				<div id="signin-container" className="modal-content">
					<span className="closeModal" onClick={this.toggleActive} />
					<div className="inner">
						<h3> Welcome Back </h3>
						<SigninForm />
						
						<div className="link-group">
							<a href="#"> Create an account </a>
							<a href="#"> Forgot password? </a>
						</div>
					</div>
				</div>
			</ModalSkeleton>
		)
	}
}

export default Signin;