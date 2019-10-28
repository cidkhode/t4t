import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardContainer from '../components/Dashboard/DashboardContainer.js';
import AccountView from '../components/Dashboard/Account/AccountView.js';

export class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
      selectedSideBarOption: '',
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

  selectTopic = (selectedSideBarOption) => this.setState({ sideBarOpen: false, selectedSideBarOption }, () => console.log(`Topic selected: `, selectedSideBarOption));

  openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

  signOut = () => { console.log('Trying to sign out'); };

  editProfilePic = (editProfilePicRef) => {
    editProfilePicRef.click();
  };

  submitProfilePic = (e) => {
    console.log(`FILES SELECTED`, e.target.files[0]);
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
      }
    })
  };

  render() {
    return (
      <DashboardContainer
        interests={ this.props.interests }
        pointsOfView={ this.props.pointsOfView }
        userAccountDetails={this.props.userAccountDetails}
        editProfilePic={ this.editProfilePic }
        submitProfilePic={ this.submitProfilePic }
      >
        <>
          <AccountView
            savedArticles={ this.props.savedArticles }
            followingUsers={ this.props.followingUsers }
            userAccountDetails={ this.props.userAccountDetails }
          />
          <Sidebar
            topics={ this.fetchTopics() }
            onTopicSelection={ this.selectTopic }
            onOpen={ this.openSideBar }
            name={ this.props.userAccountDetails.name }
            isOpen={ this.state.sideBarOpen }
            onSignOut={ this.signOut }
            selectedOption={ this.state.selectedSideBarOption }
          />
        </>
      </DashboardContainer>
    )
  }
}

UserAccount.propTypes = {
  userAccountDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }),
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
  interests: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  pointsOfView: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })),
  getProfile: PropTypes.func.isRequired,
};

UserAccount.defaultProps = {

};

export default UserAccount;