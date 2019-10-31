import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RadioButtonGroup from "../../../RadioButtonGroup/RadioButtonGroup";

class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stepCtr: 1,
			maxStep: 1,
			lastStep: 3,
			userType: 'reader',
		}
	}

	getCurrStep = (step) => {
		switch(step) {
			case 1:
				return (<p> Continue </p>);

			case 2:
				return (<p> Complete </p>);
		}
	};

	setStep = (step) => {
		if (0 < step && step <= this.state.maxStep && !(this.state.stepCtr === this.state.lastStep)) {
			this.setState({ stepCtr: step });
		}
	};

	getPrevStep = () => {
		if (this.state.stepCtr > 0) {
			this.setState({ stepCtr: this.state.stepCtr - 1 });
		}
	};

	getNextStep = (formAnswers) => {
		if (this.state.stepCtr < this.state.lastStep) {
			this.setState({ stepCtr: this.state.stepCtr + 1, maxStep: this.state.stepCtr + 1 }, () =>{
				if (this.state.stepCtr === this.state.lastStep) {
					fetch('/api/register', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(formAnswers)
					})
						.then(resp => console.log('Registration Successful', resp))
						.catch(error => console.error("Something went wrong with registering a new user", error));
				}
			});
		}
	};

	resendVerification = () => {}; // TODO: implement this when BE is ready

	onUserTypeChange = (userType) => {
		this.setState({ userType });
	};

	isFormPageInvalid = (pageNumber, values, errors) => {
		let isInvalid = false;
		if (!(Object.entries(errors).length === 0 && errors.constructor === Object)) {
			isInvalid = true;
		} else {
			switch (pageNumber) {
				case 1: {
					const firstPageValues = {
						userType: values.userType,
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
						password: values.password,
						confirmPass: values.confirmPass,
					};
					if (firstPageValues.confirmPass !== firstPageValues.password) {
						isInvalid = true;
						break;
					}
					for (let key in firstPageValues) {
						if (firstPageValues.hasOwnProperty(key) && firstPageValues[key] === '') {
							isInvalid = true;
							break;
						}
					}
					break;
				}

				case 2: {
					const secondPageValues = {
						interests: values.interests,
						fieldsOfStudy: values.fieldsOfStudy,
						viewPoints: values.viewPoints,
					};
					for (let key in secondPageValues) {
						if (secondPageValues.hasOwnProperty(key) && secondPageValues[key] === '') {
							isInvalid = true;
							break;
						}
					}
					break;
				}
				default: {
					break;
				}
			}
		}
		return isInvalid;
	};

	onKeyDown = (key) => {
		if (!key.shiftKey && key.keyCode === 9) {
			key.preventDefault();
		}
	};

	render() {
		return(
			<Formik
				initialValues={{
					userType: this.state.userType,
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPass: '',
					interests: '',
					fieldsOfStudy: '',
					viewPoints: '',
				}}
				validate={values => {
					let errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					} else if (values.password !== values.confirmPass) {
						errors.confirmPass = 'Passwords do not match!'
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
				{({ errors, values }) => {
					const isFormPageInvalid = this.isFormPageInvalid(this.state.stepCtr, values, errors);
					return (
					<div className="inner">
						<h3 style={{ display: this.state.stepCtr === this.state.lastStep ? "none" : "block" }}> Create Account </h3>
						{ this.state.stepCtr === 1 && <RadioButtonGroup
							extraClass="user-type-selection"
							onChange={ (e) => this.onUserTypeChange(e, errors, values) }
							group="userTypeGroup"
							checked={ this.state.userType }
							options={[
								{
									disabled: false,
									value: 'reader',
									label: 'Reader',
								}, {
									disabled: false,
									value: 'writer',
									label: 'Writer',
								},
							]}
						/> }
						<Form>
							<div id="steps" className={`curr-step-${this.state.stepCtr}`}>
								<div id="step-1" className={`step ${this.state.stepCtr >= 1 ? "active" : ""} ${this.state.stepCtr > 1 ? "active-hide" : ""}`}>
									<Field type="text" name="firstName" placeholder="First Name" />
									<ErrorMessage name="name" component="div" />

									<Field type="text" name="lastName" placeholder="Last Name" />
									<ErrorMessage name="lastName" component="div" />

									<Field type="email" name="email" placeholder="Email" />
									<ErrorMessage name="email" component="div" />

									<Field type="password" name="password" placeholder="Password" />
									<ErrorMessage name="password" component="div" />

									<Field onKeyDown={ this.onKeyDown } type="password" name="confirmPass" placeholder="Confirm Password" />
									<ErrorMessage name="confirm-pass" component="div" />
								</div>
								<div id="step-2" className={`step ${this.state.stepCtr > 1 ? "active" : ""} ${this.state.stepCtr === 3 ? "active-hide" : ""}`}>
									<Field type="text" name="interests" placeholder="Interests" />
									<ErrorMessage name="interests" component="div" />

									<Field type="text" name="fieldsOfStudy" placeholder="Field of Study" />
									<ErrorMessage name="fieldsOfStudy" component="div" />

									<Field onKeyDown={ this.onKeyDown } type="text" name="viewPoints" placeholder="View Points" />
									<ErrorMessage name="viewPoints" component="div" />
								</div>
								<div id="step-3" className={`step ${this.state.stepCtr === 3 ? "active" : ""}`}>
									<p> Congratulations! </p>
									<p> Application Complete </p>
									<p> Please confirm your email. </p>
									<p><a className="button" href="#" onClick={this.resendVerification}> Click to resend </a></p>
								</div>
							</div>
							<div id="signup-controls" style={{display: this.state.stepCtr === this.state.lastStep ? "none" : "block"}}>
								<div id="step-nav">
									<div onClick={this.getPrevStep} className="arrow-wrap">
										<div className={`arrow arrow-left ${this.state.stepCtr === 2 ? "active" : ""}`} />
									</div>
									{this.getCurrStep(this.state.stepCtr)}
									<div onClick={() => this.getNextStep(values)} className={ `arrow-wrap ${isFormPageInvalid ? 'disabled' : ''}` }>
										<div className={`arrow arrow-right ${this.state.stepCtr < 3 ? "active" : ""}`} />
									</div>
								</div>
								<div className="bot-row">
									<a href="#"> Sign in </a>
									<div className="step-counter">
										<p className={`${this.state.stepCtr >= 1 ? "active" : ""}`}> 1 </p>
										<p className={`${isFormPageInvalid ? 'disabled' : ''} ${this.state.stepCtr >= 2 ? "active" : ""}`}> 2 </p>
										<p className={`${isFormPageInvalid ? 'disabled' : ''} ${this.state.stepCtr === 3 ? "active" : ""}`}> 3 </p>
									</div>
									<a href="#" style={{opacity: 0, pointerEvents: 'none'}}> Sign in </a>
								</div>
							</div>
						</Form>
					</div>
				)}}
			</Formik>
		)
	}
}

export default SignupForm;