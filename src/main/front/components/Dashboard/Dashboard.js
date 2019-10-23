import React from 'react';
import { element } from 'prop-types';

/* Components */
import DashboardSidebar from './Sidebar/DashboardSidebar.js';

/* Styles */
import './Dashboard.less';

const Dashboard = props => (
	<div id="dashboard" className="dashboard">
		<DashboardSidebar />
		{props.children}
	</div>
);

Dashboard.propTypes = {
    children: element,
};

export default Dashboard;