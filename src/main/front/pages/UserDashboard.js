import React, { Component } from 'react';

import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from '../components/Dashboard/Dashboard.js';
import Account from '../components/Dashboard/Account/Account.js';
import Main from '../components/Dashboard/Main/Main.js';

class UserDashboard extends Component {
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

  signOut = () => {
    console.log('Trying to sign out');
  };


  render() {
    return (
      <Dashboard>
        <Account />
        <Sidebar
          topics={ this.fetchTopics() }
          onTopicSelection={ this.selectTopic }
          onOpen={ this.openSideBar }
          name="John Doe"
          isOpen={ this.state.sideBarOpen }
          onSignOut={ this.signOut }
          selectedOption={ this.state.selectedSideBarOption }
        />
      </Dashboard>
    )
  }
}

export default UserDashboard;