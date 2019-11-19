import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Components */
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";

/* Styles */
import './MainPage.less';

export class MainPage extends Component {
  static propTypes = {
    showSidebar: PropTypes.bool,
    handleLogin: PropTypes.func,
    isLoggedIn: PropTypes.bool,
  };

  static defaultProps = {
    showSidebar: true,
    handleLogin: () => {},
    isLoggedIn: false,
  };

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

  openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

  selectTopic = (selectedSideBarOption) => this.setState({ sideBarOpen: false, selectedSideBarOption }, () => console.log(`Topic selected: `, selectedSideBarOption));

  componentWillMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <main id="homepage">
        <Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } userAccountDetails={ this.props.userAccountDetails } getProfile={ this.props.getProfile } />
        { this.props.showSidebar &&
          < Sidebar
            topics={ this.fetchTopics() }
            onTopicSelection={ this.selectTopic }
            onOpen={ this.openSideBar }
            name="Cid Khode"
            isOpen={ this.state.sideBarOpen }
            selectedOption={ this.state.selectedSideBarOption }
            />
        }
        <div id="content">
          <div id="popnet">  
            <div id="popular">
              <h2>Most Popular From Today</h2>

              <div className="inner">
                <div className="list">
                  { this.state.mostPopularArticles.map((item, key) =>
                    <ArticlePreview
                      key={ key }
                      type={"horizontal"}
                      image={'https://picsum.photos/150'}
                      title={"NJIT Student attempts to code a website unsuccessfully"}
                      description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                    />
                  )}
                </div>
                
                <div className="list">
                  {this.state.mostPopularBig.map((item, key) =>
                    <ArticlePreview
                      key={ key }
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
                  {this.state.networkArticles.map((item, key) =>
                    <ArticlePreview
                      key={ key }
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
                {this.state.readingListArticles.map((item, key) =>
                  <ArticlePreview
                    key={ key }
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