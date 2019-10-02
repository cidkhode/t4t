import React, { Component } from 'react';

/* Components */
import ModalSkeleton from '../../Modal';
import SignupForm from './components/SignupForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './Signup.less';


class Signup extends Component {
	constructor(props) {
		super(props);

		this.toggleActive = this.toggleActive.bind(this);
	}

	toggleActive = () => {}

	render() {
		return(
			<ModalSkeleton isActive={this.props.isActive}>
				<div id="signup-container" className="modal-content">
					<span className="closeModal" onClick={this.toggleActive} />
					<SignupForm />
				</div>
			</ModalSkeleton>
		)
	}
}

export default Signup;