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
				editProfilePic={ props.editProfilePic }
				submitProfilePic={ props.submitProfilePic }
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
	editProfilePic: PropTypes.func.isRequired,
	submitProfilePic: PropTypes.func.isRequired,
};

export default DashboardContainer;