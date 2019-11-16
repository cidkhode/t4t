import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getUserAccountDetails } from '../../redux/selectors/user.selector';

/* Components */
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import DetailedPreview from "../../components/ArticlePreview/DetailedPreview";

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
      topicOpen: false,
      selectedSideBarOption: '',
      mostPopularArticles: [0,1,2],
      mostPopularBig: [0,1],
      readingListArticles: [0,1,2,3,4],
      networkArticles: [0,1],
      topicDisplay: ['Politics','Economics'],
      topics: ["Regional","Health","Technology","National"],
      showArticles: true,
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

  getTopics = () => {
    console.log("getting topics");
    fetch('api/all-topics')
    .then(resp => resp.json())
    .then(json => {
      if(json) {
        console.log(json);
        console.log("Got topics");
        let display = [], hidden = [];
        for(let i = 0; i < json.length; i++) {
          if(i < 2) {
            display.push(json[i]);
          } else {
            hidden.push(json[i]);
          }
        }
        this.setState({
          topicDisplay: display,
          topics: hidden,
        });
      }
    })
    .catch(error => console.log(error));
  }

  addTopic = (e) => {
    /*if(!this.props.isLoggedIn) {
      console.log("User not logged in.");
      return;
    } */
    fetch('/api/add-topic-to-user', {
        method: 'post',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          topicID: e.target.value,
          userEmail: this.getUserAccountDetails
        }).then(resp => resp.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => console.log(error))
      }
    )
  }

  delTopic = (e) => {
    fetch('/api/delete-topic-from-user', {
      method: 'post',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
        topicID: e.target.value,
        userEmail: this.getUserAccountDetails
      }).then(resp => resp.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => console.log(error))
    })
  }

  collapse = () => {
    this.setState({topicOpen: !this.state.topicOpen});
  }

  rightSwitch = () => {
    this.setState({showArticles: !this.state.showArticles});
  }

  componentWillMount() {
    this.getTopics();
  }

  render() {
    return (
      <main id="homepage">
        <Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } />
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
            <div id="topics">
              <h2>Topics</h2>

              <div className="inner">
                <div className="list">
                  {this.state.topicDisplay.map((item, key) => 
                    <ArticlePreview 
                      key={ key }
                      id={ item.id }
                      type={"topic"}
                      image={'https://picsum.photos/450/250'}
                      title={ item.topic }
                      description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                      like={this.addTopic}
                      numLikes={ item.numOfHearts }
                    />
                  )}
                </div>
              </div>
              <div className={this.state.topicOpen ? 'open' : 'collapsed'}>
                <div className="inner">
                  <div className="list">
                    {this.state.topics.map((item, key) =>
                      <ArticlePreview 
                        key={ key }
                        id={ item.id }
                        type={"topic"}
                        image={'https://picsum.photos/450/250'}
                        title={ item.topic }
                        description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                        numLikes={ item.numOfHearts }
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="underspace">
                <button onClick={this.collapse} className={this.state.topicOpen ? "press less" : "press more"}>Show</button>
              </div>
            </div>
            <div id="popular">
              <h2>Most Popular From Today</h2>

              <div className="inner">
                <div className="list">
                    <DetailedPreview
                      image={'https://picsum.photos/800/300'}
                      title={"NJIT Student attempts to code a website unsuccessfully"}
                      description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                    />
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
            <h2><button 
              className={`link ${this.state.showArticles ? '' : 'active'}`} 
              onClick={this.rightSwitch}
              disabled={this.state.showArticles}>Articles</button> 
              &nbsp;|&nbsp; 
              <button
              className={`link ${this.state.showArticles ? 'active' : ''}`} 
              onClick={this.rightSwitch}
              disabled={!this.state.showArticles}>Writers</button></h2>

            {this.state.showArticles &&
            <div className="inner">
              <div className="list">
                {this.state.readingListArticles.map((item, key) =>
                  <ArticlePreview
                    key={ key }
                    type={"horizontal"}
                    image={'https://picsum.photos/200'}
                    title={"NJIT Student attempts to code a website unsuccessfully"}
                    description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                  />
                )}
              </div>
            </div>}

            {!this.state.showArticles &&
            <div className="inner">
              <div className="list">
              {this.state.readingListArticles.map((item, key) =>
                  <ArticlePreview
                    key={ key }
                    type={"horizontal"}
                    image={'https://picsum.photos/201'}
                    title={"NJIT Student attempts to code a website unsuccessfully"}
                    description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
                  />
                )}
              </div>
            </div>}
          </div>

        </div>
      </main>
    )
  }
}

export default MainPage;