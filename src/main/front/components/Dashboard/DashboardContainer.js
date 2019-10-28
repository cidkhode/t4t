import React from 'react';
import PropTypes from 'prop-types';

/* Components */
import DashboardSidebar from './Sidebar/DashboardSidebar.js';

/* Styles */
import './Dashboard.less';

const DashboardContainer = props => {
	return (
		<main id="content" className="dashboard">
			<DashboardSidebar
				userAccountDetails={ props.userAccountDetails }
				interests={ props.interests }
				pointsOfView={ props.pointsOfView }
			/>
			{props.children}
		</main>
	);
};

DashboardContainer.propTypes = {
	userAccountDetails: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	interests: PropTypes.array.isRequired,
	pointsOfView: PropTypes.array.isRequired,
};

export default DashboardContainer;