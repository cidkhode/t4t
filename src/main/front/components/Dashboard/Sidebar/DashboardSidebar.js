import React, { Component } from 'react';

import './DashboardSidebar.less';

class DashboardSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<div id="dashboard-sidebar">

			<div id="dashboard-user-info">
				<div className="dashboard-img">
					<img src="https://i.pravatar.cc/175" />
				</div>

				<h3 className="dashboard-name"> John Doe </h3>

				<div className="dashboard-links">
					<a href="#"> Comments </a>
					<a href="#"> Likes </a>
				</div>
			</div>

			<div id="dashboard-interests" className="tag-container">
				<h4> Interests </h4>
				<div className="split">
					<div></div>
					<div></div>
				</div>
				<div></div>
				<div className="split">
					<div></div>
					<div></div>
				</div>
				<div></div>
				<div></div>
			</div>

			<div id="dashboard-pov" className="tag-container">
				<h4> Points of View </h4>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>

    	</div>
    )
  }
}

export default DashboardSidebar;