import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupForm = () => (
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

			<button type="submit" disabled={isSubmitting}> Sign up </button>
		</Form>
		)}
	</Formik>
);

export default SignupForm;