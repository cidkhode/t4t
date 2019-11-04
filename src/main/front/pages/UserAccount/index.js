import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { POPUP_KEYS } from '../../utils/constants';

/* Components */
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardContainer from '../../components/Dashboard/DashboardContainer.js';
import AccountView from '../../components/Dashboard/Account/AccountView.js';

/* Styles */
import './UserAccount.less';

export class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
      selectedSideBarOption: '',
      editing: false,
      aboutMe: this.props.userAccountDetails.aboutMe,
      keyToUpdate: '',
      dropdownValuesToUpdate: [],
      [POPUP_KEYS.ADD_POPUP_OPEN]: false,
    };
  }

  // TODO: when we implement login system, take username and pass it into a fetch get request to retrieve selected topics of user, and remove this mock array
  fetchTopics = () => {
    return [
      { title: 'Sample topic 1', key: 'sampleTopic1' },
      { title: 'Sample topic 2', key: 'sampleTopic2' },
      { title: 'Sample topic 3 that\'s just way too long', key: 'sampleTopic3' },
      { title: 'Sample topic 4', key: 'sampleTopic4' },
    ]
  };

  selectTopic = (selectedSideBarOption) => this.setState({ sideBarOpen: false, selectedSideBarOption });

  openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

  signOut = () => console.log('Trying to sign out');

  editProfilePic = (editProfilePicRef) => {
    editProfilePicRef.click();
  };

  toggleAboutMeEditMode = (editMode) => {
    this.setState({ editing: !this.state.editing }, () => {
      if (editMode === 'Submit') {
        fetch('/api/update-profile', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keyToUpdate: 'aboutMe',
            changesInProfile: this.state.aboutMe
          }),
        })
        .then(resp => resp.json())
        .catch(error => error);
      }
    });
  };

  onChange = (e) => this.setState({ aboutMe: e.target.value });

  updateInterestsAndViews = () => {
    const { keyToUpdate, dropdownValuesToUpdate } = this.state;
    fetch('/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keyToUpdate,
        changesInProfile: dropdownValuesToUpdate.map(value => value.label).join(',') })
      })
      .then(resp => resp.json())
      .then(json => {
        this.setState({ [POPUP_KEYS.ADD_POPUP_OPEN]: false, dropdownValuesToUpdate: [] }, () => {
          if(json.status === 0) {
            this.props.getProfile();
          }
        });
      })
      .catch(error => console.error(error));
  };

  selectNewValueToAdd = (dropdownValuesToUpdate) => {
    this.setState({ dropdownValuesToUpdate });
  };

  deleteInfo = (val, keyToUpdate) => {
    const valueToDelete = val.title;
		fetch('/api/delete-from-profile', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
        valueToDelete,
        keyToUpdate
      })
		})
    .then(resp => resp.json())
		.then(json => {
			if(json.status === 0) {
				this.props.getProfile();
			}
		})
  };

  submitProfilePic = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    fetch('/api/storage/uploadFile', {
      method: 'post',
      body: data,
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.status === 0) {
        this.props.getProfile();
        this.setState({editing: false});
      }
    })
  };

  toggleAddPopup = (key, isOpen) => {
    this.setState({ [key]: isOpen, dropdownValuesToUpdate: [], keyToUpdate: '' });
  };

  togglePopupSelection = (key, keyToUpdate) => {
    this.setState({ [key]: true, [POPUP_KEYS.ADD_POPUP_OPEN]: true, keyToUpdate })
  };

  render() {
    return (
      <>
        <Navbar isLoggedIn />
        <Sidebar
          topics={ this.fetchTopics() }
          onTopicSelection={ this.selectTopic }
          onOpen={ this.openSideBar }
          name={ `${this.props.userAccountDetails.firstName} ${this.props.userAccountDetails.lastName}` }
          isOpen={ this.state.sideBarOpen }
          onSignOut={ this.signOut }
          selectedOption={ this.state.selectedSideBarOption }
        />
        <DashboardContainer
          interests={ this.props.userAccountDetails.interests }
          viewPoints={ this.props.userAccountDetails.viewPoints }
          userAccountDetails={this.props.userAccountDetails}
          editProfilePic={ this.editProfilePic }
          submitProfilePic={ this.submitProfilePic }
          delete={ this.deleteInfo }
          updateInterestsAndViews={ this.updateInterestsAndViews }
          selectNewValueToAdd={ this.selectNewValueToAdd }
          keyToUpdate={ this.state.keyToUpdate }
          dropdownValuesToUpdate={ this.state.dropdownValuesToUpdate }
          isAddPopupActive={ this.state[POPUP_KEYS.ADD_POPUP_OPEN] }
          toggleAddPopup={ this.toggleAddPopup }
          togglePopupSelection={ this.togglePopupSelection }
        >
          <>
            <AccountView
              savedArticles={ this.props.savedArticles }
              followingUsers={ this.props.followingUsers }
              userAccountDetails={ this.props.userAccountDetails }
              editMode={ this.state.editing }
              onChangeHandler= { this.onChange }
              currentAbout= { this.state.aboutMe }
              toggleAboutMeEditMode={ this.toggleAboutMeEditMode }
            />
          </>
        </DashboardContainer>
      </>
    )
  }
}

UserAccount.propTypes = {
  userAccountDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    profilePictureURL: PropTypes.string,
    aboutMe: PropTypes.string,
    viewPoints: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })),
    interests: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })),
  }).isRequired,
  savedArticles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })),
  followingUsers:  PropTypes.arrayOf(PropTypes.shape({
    followingUserName: PropTypes.string.isRequired,
    followingUserEmail: PropTypes.string.isRequired,
    followingUserImage: PropTypes.string.isRequired,
  })),
  getProfile: PropTypes.func.isRequired,
};

UserAccount.defaultProps = {

};

export default UserAccount;