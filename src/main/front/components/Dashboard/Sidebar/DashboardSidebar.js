import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Styles */
import './DashboardSidebar.less';

export class DashboardSidebar extends Component {
	constructor(props){
		super(props);
		this.editProfilePicRef = null;
	}

	getDashboardSidebarContent = data => (
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

	render() {
		return(
			<div id="dashboard-sidebar">
				<div id="dashboard-user-info">
					<div onClick={() => this.props.editProfilePic(this.editProfilePicRef)} className="dashboard-img">
						<img src={this.props.userAccountDetails.image}/>
						<div className="edit-profile-hover-over">Edit!</div>
						<input
							type="file"
							ref={ (ref) => this.editProfilePicRef = ref }
						 	style={{display: 'none'}}
							onChange={ this.props.submitProfilePic }
						/>
					</div>
					<h3 className="dashboard-name"> {this.props.userAccountDetails.name} </h3>
					<div className="dashboard-links">
						<a href="#"> Comments </a>
						<a href="#"> Likes </a>
					</div>
				</div>
				<div className="dashboard-interests tag-container">
					<h4> Interests </h4>
					{ this.getDashboardSidebarContent(this.props.interests) }
				</div>
				<div id="dashboard-pov" className="tag-container">
					<h4> Points of View </h4>
					{ this.getDashboardSidebarContent(this.props.pointsOfView) }
				</div>
			</div>
		);
	}
}

DashboardSidebar.propTypes = {
	interests: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
	})).isRequired,
	pointsOfView: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
	})).isRequired,
	userAccountDetails: PropTypes.object.isRequired,
	editProfilePic: PropTypes.func.isRequired,
	submitProfilePic: PropTypes.func.isRequired,
};

DashboardSidebar.defaultProps = {

};

export default DashboardSidebar;