import React, { Component } from 'react';

/* Components */
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

class MainPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      signinOpen: false,
      signupOpen: false,
      sideBarOpen: false,
      selectedSideBarOption: '',
    };
  }

  // TODO: when we implement login system, take username and pass it into a fetch get request to retrieve selected topics of user, and remove this mock array
  fetchTopics = () => {
    return [
      {
        title: 'Sample topic 1',
        key: 'sampleTopic1'
      },
      {
        title: 'Sample topic 2',
        key: 'sampleTopic2'
      },
      {
        title: 'Sample topic 3 that\'s just way too long',
        key: 'sampleTopic3'
      },
      {
        title: 'Sample topic 4',
        key: 'sampleTopic4'
      },
    ]
  };

  toggleSignin = () => this.setState({ signinOpen: !this.state.signinOpen });

  toggleSignup = () => this.setState({ signupOpen: !this.state.signupOpen });

  openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

  signOut = () => {
    console.log('Trying to sign out');
  };

  fetchTest = () => {
    fetch('/api/add?name=cid&email=test@email.com')
      .then(resp => console.log(`Successful adding!`, resp))
      .catch(error => console.error(`Something wrong happened...`, error));
  };

  getAllUsers = () => {
    fetch('/api/all')
      .then(resp => console.log(`All users`, resp))
      .catch(error => console.error(`Something went wrong trying to get all users`, error));
  };

  selectTopic = (selectedSideBarOption) => this.setState({ sideBarOpen: false, selectedSideBarOption }, () => console.log(`Topic selected: `, selectedSideBarOption));

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar
          topics={ this.fetchTopics() }
          onTopicSelection={ this.selectTopic }
          onOpen={ this.openSideBar }
          name="Cid Khode"
          isOpen={ this.state.sideBarOpen }
          onSignOut={ this.signOut }
          selectedOption={ this.state.selectedSideBarOption }
        />
      </div>
    )
  }
}

export default MainPage;