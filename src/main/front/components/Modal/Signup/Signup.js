import React, { Component } from 'react';

/* Components */
import ModalSkeleton from '../../Modal';
import SignupForm from './components/SignupForm.js';
import LinkGroup from './components/LinkGroup.js';

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
					<div className="inner">
						<h3> Create Your T4T Account </h3>
						<SignupForm />
						<LinkGroup />
					</div>
				</div>
			</ModalSkeleton>
		)
	}
}

export default Signup;