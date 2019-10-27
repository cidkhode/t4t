import React from 'react';
import PropTypes from 'prop-types';
import DashboardSidebar from './Sidebar/DashboardSidebar.js';
import './Dashboard.less';

const DashboardContainer = props => {
	return (
		<div className="dashboard">
			<DashboardSidebar
				userAccountDetails={ props.userAccountDetails }
				interests={ props.interests }
				pointsOfView={ props.pointsOfView }
			/>
			{props.children}
		</div>
	);
};

DashboardContainer.propTypes = {
	userAccountDetails: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	interests: PropTypes.array.isRequired,
	pointsOfView: PropTypes.array.isRequired,
};

export default DashboardContainer;