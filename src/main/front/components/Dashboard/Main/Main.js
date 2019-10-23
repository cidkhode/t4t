import React, { Component } from 'react';


/* Styles */
import './Main.less';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	getLatest = () => {
		let latest = [];

		for (let j = 0; j < 4; j++) {
			latest.push(
				<div className="article" key={j}>
					<div className="dashboard-img article-img">
						<img src="https://picsum.photos/450/285" />
					</div>

					<p className="article-title"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
				</div>
			)
		}

		return latest;
	}

	getTopics = () => {
		return (
			<div id="article-topics">
				<p className="topic active"> All Articles (17) </p>
				<p className="topic"> Topic A (10) </p>
				<p className="topic"> Topic B (3) </p>
				<p className="topic"> Topic C (4) </p>
			</div>
		)
	}


	getArticles = () => {
		let articles = [];

		for (let j = 0; j < 8; j++) {
			articles.push(
				<div className="article" key={j}>
					<div className="dashboard-img article-img">
						<img src="https://picsum.photos/450/280" />
					</div>

					<p className="article-title"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
				</div>
			)
		}

		return articles;
	}


	render() {
		return (
			<div id="dashboard-main">
				<div id="latest-activity" className="article-container">
					<h3> Latest Activity </h3>

					<div className="inner">
						{this.getLatest()}
					</div>
				</div>

				<div id="articles" className="article-container">
					{this.getTopics()}

					<div className="inner">
						{this.getArticles()}
					</div>
				</div>

			</div>
		)
	}
}

export default Main;