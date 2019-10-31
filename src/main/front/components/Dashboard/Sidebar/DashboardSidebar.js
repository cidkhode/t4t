import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POPUP_KEYS, LOCAL_STORAGE_KEYS } from '../../../utils/constants';
import AddInfo from '../../Modal/AddInfo/AddInfo';

/* Styles */
import './DashboardSidebar.less';

export class DashboardSidebar extends Component {
	constructor(props){
		super(props);
		this.editProfilePicRef = null;
		this.state = {
			[POPUP_KEYS.ADD_POPUP_OPEN]: false,
			addType: "Interest",
		}
	}

	togglePopup = (key, isOpen) => {
		this.setState({ [key]: isOpen }, () => {
		  console.log(`KEY`, key, isOpen)
		});
	};

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
					<h4> Interests <a href="javascript:void(0)" onClick={() => this.setState({[POPUP_KEYS.INTERESTS_POPUP_OPEN]: true, addType: "Interest"})}>Add...</a></h4>
					{ this.getDashboardSidebarContent(this.props.interests, "interest") }
				</div>
				<div id="dashboard-pov" className="tag-container">
					<h4> Points of View <a href="javascript:void(0)" onClick={() => this.setState({[POPUP_KEYS.INTERESTS_POPUP_OPEN]: true, addType: "View"})}>Add...</a></h4>
					{ this.getDashboardSidebarContent(this.props.pointsOfView, "view") }
				</div>
				<AddInfo
					type={ this.state.addType }
					closeWindow={ () => this.togglePopup(POPUP_KEYS.ADD_POPUP_OPEN, !this.state[POPUP_KEYS.ADD_POPUP_OPEN]) }
					isActive={ this.state[POPUP_KEYS.ADD_POPUP_OPEN] }
					addFunc={ this.props.addFunc }
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
};

DashboardSidebar.defaultProps = {

};

export default DashboardSidebar;