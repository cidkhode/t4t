import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from "../../components/Button/Button";

class Opsbar extends Component {
	constructor(props) {
		super(props);

		this.debouncedPostUpdatedTitle = _.debounce(this.postUpdatedTitle, 1000);
	}

	postUpdatedTitle = () => console.log(this.props.articleTitle);

	onTitleChange = event => {
		this.props.updateArticleTitle(event.target.value);
		this.debouncedPostUpdatedTitle();
	}

	render(){
		return (
			<div id="t4t-title-wrapper">
				<form>
					<input type="text" value={this.props.articleTitle} onChange={this.onTitleChange} name="title" placeholder="untitled article..." />
				</form>

				<div className="btn-group">
					<Button
						extraClass="nav-bar-sign-in-button nav-bar-right-child"
						handleClick={ () => {} }
						text="Upload Article Image"
					/>

					<Button
						extraClass="nav-bar-sign-in-button nav-bar-right-child"
						handleClick={ () => this.props.toggleSubmission() }
						text="Publish Article"
					/>
				</div>
			</div>
		)
	}
}

Opsbar.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  articleTitle: PropTypes.string,
  articleId: PropTypes.number,
  user: PropTypes.object,
};

export default Opsbar;