import React from 'react';
import { array } from 'prop-types';

/* Styles */
import './Main.less';

const Main = props => (
	<div id="dashboard-main" className="dashboard-page">
		<div id="latest-activity" className="article-container">
			<h3> Latest Activity </h3>

			<div className="inner">
				{props.latest}
			</div>
		</div>

		<div id="articles" className="article-container">
			<div className="article-topics">
				<p className="topic active"> All Articles (17) </p>
				<p className="topic"> Topic A (10) </p>
				<p className="topic"> Topic B (3) </p>
				<p className="topic"> Topic C (4) </p>
			</div>

			<div className="inner">
				{props.articles}
			</div>
		</div>
	</div>
);

Main.propTypes = {
	articles: array.isRequired,
	latest: array.isRequired,
};

export default Main;