import React from 'react';
import PropTypes from 'prop-types';

/* Styles */
import './DashboardSidebar.less';

const getDashboardSidebarContent = data => (
	data.map((interest, key, interestsArray) => {
		const mod = key % 3;
		switch (mod) {
			case 1: {
				if (key < interestsArray.length-1) {
					return (
						<div key={ key } className="split">
							<div className="split-items"><span>{interest.title}</span></div>
							<div className="split-items"><span>{interestsArray[key+1].title}</span></div>
						</div>
					)
				} else {
					return <div key={ key } className="split-items"><span>{interest.title}</span></div>
				}
			}
			case 2: break;
			case 0: {
				return <div key={ key } className="split-items"><span>{interest.title}</span></div>
			}
		}
	})
);
export const DashboardSidebar = props => (
	<div id="dashboard-sidebar">
		<div id="dashboard-user-info">
			<div className="dashboard-img">
				<img src={props.userAccountDetails.image} />
			</div>
			<h3 className="dashboard-name"> {props.userAccountDetails.name} </h3>
			<div className="dashboard-links">
				<a href="#"> Comments </a>
				<a href="#"> Likes </a>
			</div>
		</div>
		<div className="dashboard-interests tag-container">
			<h4> Interests </h4>
			{ getDashboardSidebarContent(props.interests) }
		</div>
		<div id="dashboard-pov" className="tag-container">
			<h4> Points of View </h4>
			{ getDashboardSidebarContent(props.pointsOfView) }
		</div>
	</div>
);

DashboardSidebar.propTypes = {
	interests: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
	})).isRequired,
	pointsOfView: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
	})).isRequired,
	userAccountDetails: PropTypes.object.isRequired,
};

DashboardSidebar.defaultProps = {

};

export default DashboardSidebar;