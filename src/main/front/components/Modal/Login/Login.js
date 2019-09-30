import React, { Component } from 'react';

/* Components */
import ModalSkeleton from '../../Modal';
import LoginForm from './components/LoginForm.js';
import LinkGroup from './components/LinkGroup.js';

/* Styles */
import '../ModalSkeleton.less';
import './Login.less';


class Login extends Component {
	constructor(props) {
		super(props);

		this.toggleActive = this.toggleActive.bind(this);
	}

	toggleActive = () => {}

	render() {
		return(
			<ModalSkeleton isActive={this.props.isActive}>
				<div id="login-container" className="modal-content">
					<span className="closeModal" onClick={this.toggleActive} />
					<div className="inner">
						<h3> Welcome Back </h3>
						<LoginForm />
						<LinkGroup />
					</div>
				</div>
			</ModalSkeleton>
		)
	}
}

export default Login;