import React, { PureComponent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class SigninForm extends PureComponent {
	sendLogin = (values) => {
		const {email, password} = values;
		fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email,password })
		})
			.then(resp => console.log('Login Successful', resp))
			.catch(error => console.error("Something went wrong.", error));
	};

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
				onSubmit={(values) => this.sendLogin(values)}
			>
				{({ isSubmitting }) => (
				<Form>
					<Field type="email" name="email" placeholder="Email" />
					<ErrorMessage name="email" component="div" />

					<Field type="password" name="password" placeholder="Password" />
					<ErrorMessage name="password" component="div" />

					<button className="formik-sign-in-button" type="submit" disabled={isSubmitting}> <span> Sign in </span> <div className="arrow"/> </button>
				</Form>
				)}
			</Formik>
		)
	}
}

export default SigninForm;