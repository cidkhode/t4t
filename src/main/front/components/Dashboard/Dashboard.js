import React from 'react';
import { element, object } from 'prop-types';

/* Components */
import DashboardSidebar from './Sidebar/DashboardSidebar.js';

/* Styles */
import './Dashboard.less';

const Dashboard = props => (
	<div id="dashboard" className="dashboard">
		<DashboardSidebar userProfile={props.userProfile} />
		{props.children}
	</div>
);

Dashboard.propTypes = {
    userProfile: object.isRequired,
    children: element.isRequired,
};

export default Dashboard;