import React from 'react';
import { array } from 'prop-types';
import './Main.less';

const DashboardView = props => (
	<div id="dashboard-main" className="dashboard-page">
		<div id="latest-activity" className="article-container">
			<h3> Latest Activity </h3>

			<div className="inner">
				{props.latestArticles.map((article, key) => (
					<div className="article" key={key}>
						<div className="dashboard-img article-img">
							<img src={ article.image } />
						</div>
						<p className="article-title">{article.title}</p>
					</div>
				))}
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
				{
					props.allArticles.map((article, key) => (
						<div className="article" key={key}>
							<div className="dashboard-img article-img">
								<img src={ article.image } />
							</div>
							<p className="article-title">{article.title}</p>
						</div>
					))
				}
			</div>
		</div>
	</div>
);

DashboardView.propTypes = {
	allArticles: array.isRequired,
	latestArticles: array.isRequired,
};

export default DashboardView;