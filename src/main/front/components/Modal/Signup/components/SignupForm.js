import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stepCtr: 1,
			maxStep: 1,
			lastStep: 3
		}

		this.getCurrStep = this.getCurrStep.bind(this);
		this.setStep = this.setStep.bind(this);
		this.getPrevStep = this.getPrevStep.bind(this);
		this.getNextStep = this.getNextStep.bind(this);
		this.resendVerification = this.resendVerification.bind(this);
	}

	getCurrStep(step) {
		switch(step) {
			case 1:
				return (<p onClick={this.getNextStep}> Sign Up </p>);
				break;
			
			case 2:
				return (<p onClick={this.getNextStep}> Complete </p>);
				break;

			case 3:
				return (<p><a className="button" onClick={this.resendVerification}> Resend verification email </a></p>);
				break;
		}
	}

	setStep(step) {
		if (0 < step && step <= this.state.maxStep && !(this.state.stepCtr === this.state.lastStep)) {
			this.setState({ stepCtr: step });
		}
	}

	getPrevStep() {
		if (this.state.stepCtr > 0) {
			this.setState({ stepCtr: this.state.stepCtr - 1 });
		}
	}

	getNextStep() {
		if (this.state.stepCtr < this.state.lastStep) {
			this.setState({ stepCtr: this.state.stepCtr + 1, maxStep: this.state.stepCtr + 1 });
		}
	}

	resendVerification() {
		return;
	}



	render() {
		return(
			<Formik
				initialValues={{ usertype: '', name: '', email: '', password: '', confirmpass: '' }}
				validate={values => {
					let errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<div id="steps" className={`curr-step-${this.state.stepCtr}`}>
							<div id="step-1" className={`step ${this.state.stepCtr >= 1 ? "active" : ""} ${this.state.stepCtr > 1 ? "active-hide" : ""}`}>
								<Field type="text" name="usertype" placeholder="Reader or Writer" />
								<ErrorMessage name="usertype" component="div" />

								<Field type="text" name="name" placeholder="Name" />
								<ErrorMessage name="name" component="div" />

								<Field type="email" name="email" placeholder="Email" />
								<ErrorMessage name="email" component="div" />

								<Field type="password" name="password" placeholder="Password" />
								<ErrorMessage name="password" component="div" />

								<Field type="password" name="confirmpass" placeholder="Confirm Password" />
								<ErrorMessage name="confirm-pass" component="div" />
							</div>

							<div id="step-2" className={`step ${this.state.stepCtr > 1 ? "active" : ""} ${this.state.stepCtr === 3 ? "active-hide" : ""}`}>
								<Field type="text" name="interests" placeholder="Interests" />
								<ErrorMessage name="interests" component="div" />

								<Field type="text" name="field_study" placeholder="Field of Study" />
								<ErrorMessage name="field_study" component="div" />

								<Field type="text" name="view_points" placeholder="View Points" />
								<ErrorMessage name="view_points" component="div" />
							</div>

							<div id="step-3" className={`step ${this.state.stepCtr === 3 ? "active" : ""}`}>
								<p> Registration Complete. </p>
								<p> Please confirm your email. </p>
							</div>
						</div>


						<div id="signup-controls">
							<div id="step-nav">
								<div onClick={this.getPrevStep} className={`arrow-left ${this.state.stepCtr === 2 ? "active" : ""}`}></div>
								{this.getCurrStep(this.state.stepCtr)}
								<div onClick={this.getNextStep} className={`arrow-right ${this.state.stepCtr < 3 ? "active" : ""}`}></div>
							</div>

							<div id="step-counter">
								<p onClick={this.setStep.bind(this, 1)} className={`${this.state.stepCtr >= 1 ? "active" : ""}`}> 1 </p>
								<p onClick={this.setStep.bind(this, 2)} className={`${this.state.stepCtr >= 2 ? "active" : ""}`}> 2 </p>
								<p onClick={this.setStep.bind(this, 3)} className={`${this.state.stepCtr === 3 ? "active" : ""}`}> 3 </p>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		)
	}
}

export default SignupForm;