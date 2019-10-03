import React, { PureComponent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
				}}
			>
				{({ isSubmitting }) => (
				<Form>
					<Field type="email" name="email" placeholder="Email" />
					<ErrorMessage name="email" component="div" />

					<Field type="password" name="password" placeholder="Password" />
					<ErrorMessage name="password" component="div" />

					<button type="submit" disabled={isSubmitting}> <span> Sign in </span> <div className="arrow"></div> </button>
				</Form>
				)}
			</Formik>
		)
	}
}

export default SigninForm;