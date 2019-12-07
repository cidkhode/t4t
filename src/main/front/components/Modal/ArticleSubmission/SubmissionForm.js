import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class SubmissionForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stepCtr: 1,
			maxStep: 1,
			lastStep: 2,
		}
	}

	getPrevStep = () => {
		if (this.state.stepCtr > 0) {
			this.setState({ stepCtr: this.state.stepCtr - 1 });
		}
	};

	getNextStep = isInvalid => {
		if ((this.state.stepCtr < this.state.lastStep) && !isInvalid) {
			this.setState({ stepCtr: this.state.stepCtr + 1, maxStep: this.state.stepCtr + 1 });
		}
	};

	isFormPageInvalid = (pageNumber, values, errors) => {
		let isInvalid = false;

		if (!(Object.entries(errors).length === 0 && errors.constructor === Object)) {
			isInvalid = true;
		} else {
			switch(pageNumber) {
				case 1:
					const firstPageValues = {
						topics: values.topics,
						ref_link_one: values.ref_link_one,
						ref_link_two: values.ref_link_two,
						add_ref: values.add_ref,
					};

					for (let key in firstPageValues) {
						if (firstPageValues.hasOwnProperty(key) && firstPageValues[key] === '') {
							isInvalid = true;
							break;
						}
					}
					break;

				case 2:
					const secondPageValues = {
						description: values.description,
					};
					for (let key in secondPageValues) {
						if (secondPageValues.hasOwnProperty(key) && secondPageValues[key] === '') {
							isInvalid = true;
							break;
						}
					}
					break;

				default:
					break;
			}
		}

		return isInvalid;
	};

	handleSubmit = values => {
			fetch('/api/article/publish-article', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ articleId: this.props.articleId })
			})
				.then(res => console.dir(res.json()))
				.catch(err => console.error('Error: ', err));
	}

	render() {
		return(
			<Formik
				initialValues={{
					tags: '',
					topics: '',
					ref_link_one: '',
					ref_link_two: '',
					add_ref: '',
					description: '',
				}}
				onSubmit={(values, { setSubmitting }) => this.handleSubmit(values)}
			>
				{({ errors, values }) => {
					const isFormPageInvalid = this.isFormPageInvalid(this.state.stepCtr, values, errors);
					return (
					<div className="inner">
						<h3 style={{ display: this.state.stepCtr === this.state.lastStep ? "none" : "block" }}> Publish Article </h3>
						<Form>
							<div id="steps" className={`curr-step-${this.state.stepCtr}`}>
								<div id="step-1" className={`step ${this.state.stepCtr >= 1 ? "active" : ""} ${this.state.stepCtr > 1 ? "active-hide" : ""}`}>
									<Field type="text" name="tags" placeholder="Tags" />
									<ErrorMessage name="tags" component="div" />

									<Field type="text" name="topics" placeholder="Topics" />
									<ErrorMessage name="topics" component="div" />

									<Field type="text" name="ref_link_one" placeholder="Reference Link #1" />
									<ErrorMessage name="ref_link_one" component="div" />

									<Field type="text" name="ref_link_two" placeholder="Reference Link #2" />
									<ErrorMessage name="ref_link_two" component="div" />

									<Field type="text" name="add_ref" placeholder="Add Reference" />
									<ErrorMessage name="add_ref" component="div" />
								</div>
								<div id="step-2" className={`step ${this.state.stepCtr === 2 ? "active" : ""}`}>
									<p> { this.props.articleTitle || "untitled article" } </p>
									<p> { values.description } </p>
									<p> { values.tags } </p>
									<button type="submit">Publish!</button>
								</div>
							</div>
							<div id="signup-controls" style={{display: this.state.stepCtr === this.state.lastStep ? "none" : "block"}}>
								<div id="step-nav">
									<div onClick={this.getPrevStep} className="arrow-wrap">
										<div className={`arrow arrow-left ${this.state.stepCtr === 2 ? "active" : ""}`} />
									</div>
									<p> Continue </p>
									<div onClick={() => this.getNextStep(false)} className={`arrow-wrap ${false ? 'disabled' : ''}` }>
										<div className={`arrow arrow-right ${this.state.stepCtr < 3 ? "active" : ""}`} />
									</div>
								</div>
								<div className="bot-row">
									<a href="#" onClick={ this.props.closeModal }> Cancel </a>
									<div className="step-counter">
										<p className={`${(this.state.stepCtr > 1) ? '' : 'active'}`}> 1 </p>
										<p className="disabled"> 2 </p>
									</div>
									<a href="#" style={{opacity: 0, pointerEvents: 'none'}}> Cancel </a>
								</div>
							</div>
						</Form>
					</div>
				)}}
			</Formik>
		)
	}
}

SubmissionForm.propTypes = {
	articleTitle: PropTypes.string,
	articleId: PropTypes.number,
	closeModal: PropTypes.func,
};

export default SubmissionForm;