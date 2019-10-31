import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Components */
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardContainer from '../../components/Dashboard/DashboardContainer.js';
import DashboardView from '../../components/Dashboard/Main/DashboardView.js';

/* Styles */
import './UserDashboard.less';

export class UserDashboard extends Component {
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

  signOut = () => console.log('Trying to sign out');

  render() {
    return (
      <>
        <Navbar />
        <Sidebar
          topics={ this.fetchTopics() }
          onTopicSelection={ this.selectTopic }
          onOpen={ this.openSideBar }
          name={ this.props.userAccountDetails.name }
          isOpen={ this.state.sideBarOpen }
          onSignOut={ this.signOut }
          selectedOption={ this.state.selectedSideBarOption }
        />
        <DashboardContainer
          userAccountDetails={this.props.userAccountDetails }
          interests={ this.props.interests }
          pointsOfView={ this.props.pointsOfView }
        >
          <DashboardView
            allArticles={ this.props.allArticles }
            latestArticles={ this.props.latestArticles }
          />
        </DashboardContainer>
      </>
    )
  }
}

UserDashboard.propTypes = {
  userAccountDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }),
  latestArticles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })),
  allArticles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })),
  interests: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  pointsOfView: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })),
};

UserDashboard.defaultProps = {

};

export default UserDashboard;