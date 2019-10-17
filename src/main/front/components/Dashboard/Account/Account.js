import React, { Component } from 'react';

import './Account.less';

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<div id="dashboard-account">

			<div id="account-user-info">
				<p className="account-name"> Account Name </p>
				<p className="account-email"> Email </p>
				<p className="account-about"> About </p>
			</div>

			<div id="account-article-saved" className="account-slider">
				<h4> Saved Articles </h4>
				<div className="inner">
					<div className="article">
						<div className="dashboard-img">
							<img src="https://via.placeholder.com/130" />
						</div>

						<div>
							<div></div>
							<div></div>
						</div>
					</div>

					<div className="article">
						<div className="dashboard-img">
							<img src="https://via.placeholder.com/130" />
						</div>

						<div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>

			<div id="account-following" className="account-slider">
				<h4> Following </h4>
				<div className="inner">
					<div className="following">
						<div className="dashboard-img">
							<img src="https://via.placeholder.com/130" />
						</div>

						<div>
							<div></div>
							<div></div>
						</div>
					</div>

					<div className="following">
						<div className="dashboard-img">
							<img src="https://via.placeholder.com/130" />
						</div>

						<div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>

			<div id="account-article-topics">
				<p className="topic active"> All Articles (17) </p>
				<p className="topic"> Topic A (10) </p>
				<p className="topic"> Topic B (3) </p>
				<p className="topic"> Topic C (4) </p>
			</div>			

    	</div>
    )
  }
}

export default Account;