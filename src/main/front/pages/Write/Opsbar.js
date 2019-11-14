import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getIsSubmitting, getCurrentArticleTitle, getCurrentArticleId } from '../../redux/selectors/t4teditor.selector';
import { toggleEditorSubmitState, updateArticleTitle, updateArticleId } from '../../redux/actions/t4teditor.action';

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
			</div>
		)
	}
}

Opsbar.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  articleTitle: PropTypes.string,
  articleId: PropTypes.number,
};

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
  articleTitle: getCurrentArticleTitle(state),
  articleId: getCurrentArticleId(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
	toggleEditorSubmitState,
	updateArticleTitle,
	updateArticleId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Opsbar);