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
				updateInterestsAndViews={ props.updateInterestsAndViews }
				userAccountDetails={ props.userAccountDetails }
				interests={ props.interests }
				viewPoints={ props.viewPoints }
				editProfilePic={ props.editProfilePic }
				submitProfilePic={ props.submitProfilePic }
				delete={ props.delete }
				selectNewValueToAdd={ props.selectNewValueToAdd }
				keyToUpdate={ props.keyToUpdate }
				dropdownValuesToUpdate={ props.dropdownValuesToUpdate }
				isAddPopupActive={ props.isAddPopupActive }
				toggleAddPopup={ props.toggleAddPopup }
				togglePopupSelection={ props.togglePopupSelection }
			/>
			{props.children}
		</main>
	);
};

DashboardContainer.propTypes = {
	userAccountDetails: PropTypes.object,
	children: PropTypes.element.isRequired,
	interests: PropTypes.array,
	viewPoints: PropTypes.array,
	editProfilePic: PropTypes.func.isRequired,
	submitProfilePic: PropTypes.func.isRequired,
	delete: PropTypes.func.isRequired,
	updateInterestsAndViews: PropTypes.func.isRequired,
	selectNewValueToAdd: PropTypes.func.isRequired,
	keyToUpdate: PropTypes.string.isRequired,
	dropdownValuesToUpdate: PropTypes.array.isRequired,
	isAddPopupActive: PropTypes.bool.isRequired,
	toggleAddPopup: PropTypes.func.isRequired,
	togglePopupSelection: PropTypes.func.isRequired,
};

DashboardContainer.defaultProps = {
	interests: [],
	viewPoints: [],
	userAccountDetails: {}
};

export default DashboardContainer;