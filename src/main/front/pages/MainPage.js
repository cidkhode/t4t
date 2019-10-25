import React, { Component } from 'react';

/* Components */
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";

/* Styles */
import './Homepage.less';

class MainPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      signinOpen: false,
      signupOpen: false,
      sideBarOpen: false,
      selectedSideBarOption: '',
      mostPopularArticles: [0,1,2],
      mostPopularBig: [0,1],
      readingListArticles: [0,1,2,3,4],
      networkArticles: [0,1],
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
      <main id="homepage">
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
        <div id="content">
          
          <div id="popnet">  
            <div id="popular">
              <h2>Most Popular From Today</h2>

              <div className="inner">
                <div className="list">
                  {this.state.mostPopularArticles.map((item) => 
                    <ArticlePreview
                      type={"horizontal"}
                      image={'https://picsum.photos/150'}
                      title={"NJIT Student attempts to code a website unsuccessfully"}
                      description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                    />
                  )}
                </div>
                
                <div className="list">
                  {this.state.mostPopularBig.map((item) => 
                    <ArticlePreview
                      type={"vertical"}
                      image={'https://picsum.photos/400/150'}
                      title={"NJIT Student attempts to code a website unsuccessfully"}
                      description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                    />
                  )}
                </div>
              </div>
            </div>

            <div id="network">
              <h2>New From Your Network</h2>

              <div className="inner">
                <div className="list">
                  {this.state.networkArticles.map((item) => 
                    <ArticlePreview
                      type={"vertical"}
                      image={'https://picsum.photos/450/250'}
                      title={"NJIT Student attempts to code a website unsuccessfully"}
                      description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>

          <div id="reading">
            <h2>Reading List</h2>

            <div className="inner">
              <div className="list">
                {this.state.readingListArticles.map((item) => 
                  <ArticlePreview
                    type={"horizontal"}
                    image={'https://picsum.photos/150'}
                    title={"NJIT Student attempts to code a website unsuccessfully"}
                    description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    )
  }
}

export default MainPage;