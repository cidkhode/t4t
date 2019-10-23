import React, { Component } from 'react';

/* Components */
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from '../components/Dashboard/Dashboard.js';
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

  getLatest = () => {
    let latest = [];

    for (let j = 0; j < 4; j++) {
      latest.push(
        <div className="article" key={j}>
          <div className="dashboard-img article-img">
            <img src="https://picsum.photos/450/285" />
          </div>

          <p className="article-title"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
      )
    }

    return latest;
  }

  getArticles = () => {
    let articles = [];

    for (let j = 0; j < 8; j++) {
      articles.push(
        <div className="article" key={j}>
          <div className="dashboard-img article-img">
            <img src="https://picsum.photos/450/280" />
          </div>

          <p className="article-title"> Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
        </div>
      )
    }

    return articles;
  }

  getUserProfile = () => ({ name: "John Doe", imageUrl: "https://i.pravatar.cc/175" });

  render() {
    return (
      <Dashboard userProfile={this.getUserProfile()}>
        <>
          <Main articles={this.getArticles()} latest={this.getLatest()} />
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

export default UserDashboard;