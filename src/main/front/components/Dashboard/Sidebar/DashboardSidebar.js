import React from 'react';

/* Styles */
import './DashboardSidebar.less';

const DashboardSidebar = props => (
	<div id="dashboard-sidebar">
		<div id="dashboard-user-info">
			<div className="dashboard-img">
				<img src={props.userProfile.imageUrl} />
			</div>

			<h3 className="dashboard-name"> {props.userProfile.name} </h3>

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
);

export default DashboardSidebar;