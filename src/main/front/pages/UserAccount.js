import React, { Component } from 'react';

/* Components */
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard.js';
import Account from '../components/Dashboard/Account/Account.js';

class UserAccount extends Component {
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

  getArticles = () => {
    let articles = [];

    for (let j = 0; j < 4; j++) {
      articles.push(
        <div className="article" key={j}>
          <div className="dashboard-img article-img">
            <img src="https://picsum.photos/450/285" />
          </div>

          <p className="article-title"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
      )
    }

    return articles;
  }

  getFollowing = () => {
    let followers = [];

    for (let j = 0; j < 5; j++) {
      followers.push(
        <div className="following" key={j}>
          <div className="dashboard-img following-img">
            <img src="https://i.pravatar.cc/120" />
          </div>

          <p className="following-name"> John Doe </p>
        </div>
      )
    }

    return followers;
  }

  getUserProfile = () => ({ name: "John Doe", imageUrl: "https://i.pravatar.cc/175" });

  render() {
    return (
      <Dashboard userProfile={this.getUserProfile()}>
        <>
          <Account articles={this.getArticles()} following={this.getFollowing()} />
          <Sidebar
            topics={ this.fetchTopics() }
            onTopicSelection={ this.selectTopic }
            onOpen={ this.openSideBar }
            name="John Doe"
            isOpen={ this.state.sideBarOpen }
            onSignOut={ this.signOut }
            selectedOption={ this.state.selectedSideBarOption }
          />
        </>
      </Dashboard>
    )
  }
}

export default UserAccount;