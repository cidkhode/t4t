import React, { Component } from 'react';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton';
import SignupForm from './components/SignupForm.js';

/* Styles */
import '../ModalSkeleton.less';
import './Signup.less';


class Signup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<ModalSkeleton isActive={this.props.isActive}>
				<div id="signup-container" className="modal-content">
					<span className="closeModal" />
					<SignupForm />
				</div>
			</ModalSkeleton>
		)
	}
}

export default Signup;