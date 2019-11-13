import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class Title extends Component {
	render(){
		return (
			<div id="t4t-title-wrapper">
				<Formik initialValues={{ title: this.props.title }} onSubmit={ (values) => {}}>
					{({ }) => (
						<Form>
							<Field type="text" name="title" placeholder="untitled article..." />
							<ErrorMessage name="title" component="div" />
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}

export default Title;