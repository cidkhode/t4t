import React, { PureComponent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { func } from 'prop-types';

class SigninForm extends PureComponent {
	render(){
		return (
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={values => {
					let errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					}
					return errors;
				}}
				onSubmit={ (values) => this.props.sendLogin(values) }
			>
				{({ }) => (
				<Form>
					<Field type="email" name="email" placeholder="Email" />
					<ErrorMessage name="email" component="div" />

					<Field type="password" name="password" placeholder="Password" />
					<ErrorMessage name="password" component="div" />

					<button className="formik-sign-in-button" type="submit"> <span> Sign in </span> <div className="arrow"/> </button>
				</Form>
				)}
			</Formik>
		)
	}
}

SigninForm.propTypes = {
	sendLogin: func.isRequired,
};

export default SigninForm;