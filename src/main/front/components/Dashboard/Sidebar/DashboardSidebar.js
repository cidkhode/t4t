import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POPUP_KEYS, SAMPLE_INTERESTS_TO_SELECT_FROM } from '../../../utils/constants';
import AddInfo from '../../Modal/AddInfo/AddInfo';

/* Styles */
import './DashboardSidebar.less';

export class DashboardSidebar extends Component {
	constructor(props){
		super(props);
		this.editProfilePicRef = null;
		this.state = {
			keyToUpdate: "Interest",
			valuesToUpdate: []
		}
	}

	getDashboardSidebarContent = (data, type) => (
		data.map((interest, key, interestsArray) => {
			const mod = key % 3;
			switch (mod) {
				case 1: {
					if (key < interestsArray.length-1) {
						return (
							<div key={ key } className="split">
								<div className="split-items">
									<span>{interest.title}</span>
									<button className="x-button" onClick={ () => this.props.delete(interest) } id={ key } name={ type }/>
								</div>
								<div className="split-items">
									<span>{interestsArray[key+1].title}</span>
									<button className="x-button" onClick={ () => this.props.delete(interest) } id={ key+1 } name={ type }/>
								</div>
							</div>
						)
					} else {
						return <div key={ key } className="split-items">
							<span>{interest.title}</span>
							<button className="x-button" onClick={ () => this.props.delete(interest) } id={ key } name={ type }/>
						</div>
					}
				}
				case 2: break;
				case 0: {
					return <div key={ key } className="split-items">
						<span>{interest.title}</span>
						<button className="x-button" onClick={ () => this.props.delete(interest) } id={ key } name={ type }/>
					</div>
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
					<h4> Interests
						<div
						className="add-interests"
						onClick={ () => this.props.togglePopupSelection(POPUP_KEYS.INTERESTS_POPUP_OPEN, 'Interests') }>
							Add...
						</div>
					</h4>
					{ this.getDashboardSidebarContent(this.props.interests, "interest") }
				</div>
				<div id="dashboard-pov" className="tag-container">
					<h4> Points of Views
						<div className="add-view-points"
								 onClick={ () => this.props.togglePopupSelection(POPUP_KEYS.INTERESTS_POPUP_OPEN, 'Views') }>
							Add...
						</div>
					</h4>
					{ this.getDashboardSidebarContent(this.props.pointsOfView, "view") }
				</div>
				<AddInfo
					isMulti
					options={ this.props.keyToUpdate ? SAMPLE_INTERESTS_TO_SELECT_FROM[this.props.keyToUpdate] : [] }
					type={ this.props.keyToUpdate }
					selectNewValueToAdd={ this.props.selectNewValueToAdd }
					selectedOptions={ this.props.dropdownValuesToUpdate }
					closeWindow={ () => this.props.toggleAddPopup(POPUP_KEYS.ADD_POPUP_OPEN, !this.props.isAddPopupActive) }
					isActive={ this.props.isAddPopupActive }
					addFunc={ () => this.props.updateInterestsAndViews(this.props.keyToUpdate, this.props.dropdownValuesToUpdate) }
					addInfoPopupExtraClass="add-info-dashboard-sidebar"
				/>
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
	delete: PropTypes.func.isRequired,
	dropdownValuesToUpdate: PropTypes.array.isRequired,
	updateInterestsAndViews: PropTypes.func.isRequired,
	selectNewValueToAdd: PropTypes.func.isRequired,
	keyToUpdate: PropTypes.string.isRequired,
	isAddPopupActive: PropTypes.bool.isRequired,
	toggleAddPopup: PropTypes.func.isRequired,
	togglePopupSelection: PropTypes.func.isRequired,
};

DashboardSidebar.defaultProps = {

};

export default DashboardSidebar;