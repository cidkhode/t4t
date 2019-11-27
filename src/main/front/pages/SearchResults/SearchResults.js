import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import ResultPreview from '../../components/ResultPreview/ResultPreview';

import './SearchResults.less';

export class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signinOpen: false,
            signupOpen: false,
            sideBarOpen: false,
            filter: "all",
            results: [0,1,2,3,4,5,6,7],
        }
    }

    openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

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

    changeFilter = (e) => {
      this.setState({
        filter: e.currentTarget.value
      })
    }

    toTop = () => {
      console.log("Scrolling back up!");
      window.scrollTo(0,0);
    }

    render() {
        return (
            <div>
                <Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } />
                <div className="searchContent">
                  <div className="searchInfo">
                    <div className="searchFilters">
                      FILTER:
                      <form className="filterButtons">
                        <input type="radio" name="filter" value="all" onChange={this.changeFilter} checked={this.state.filter == "all"}/><span>Show All</span>
                        <input type="radio" name="filter" value="article" onChange={this.changeFilter} checked={this.state.filter == "article"}/><span>Articles</span>
                        <input type="radio" name="filter" value="topic" onChange={this.changeFilter} checked={this.state.filter == "topic"}/><span>Topics</span>
                        <input type="radio" name="filter" value="user" onChange={this.changeFilter} checked={this.state.filter == "user"}/><span>Users</span>
                      </form>
                    </div>
                    <div className="searchQuery">
                      You searched for: "<span style={{fontWeight: "700"}}>{this.props.query ? this.props.query : "Important Writer Dude"}</span>"
                    </div>
                  </div>
                  <div className="searchResults">
                    {this.state.results.map((item, key) => 
                      <ResultPreview 
                        type={'user'}
                        picture={'https://picsum.photos/150'}
                        title={'Important Writer Dude'}
                        desc={'Release your grip from that which you\'ve been holding back for a while. Release it swiftly, release it acceptingly. Don\'t look back and rage against its potential to reappear. Don\'t let others dictate your actions. Let your determination show. The cold never bothered me anyway.'}
                      />
                    )}
                    <div className="endOfResults"><span className="toTop" onClick={this.toTop} title="Return to the Top of Results">Back to Top</span></div>
                  </div>
                </div>
                { this.props.showSidebar &&
                    <Sidebar
                        topics={ this.props.userAccountDetails.topics ? this.props.userAccountDetails.topics : this.fetchTopics() }
                        onTopicSelection={ this.selectTopic }
                        onOpen={ this.openSideBar }
                        name="Cid Khode"
                        isOpen={ this.state.sideBarOpen }
                        selectedOption={ this.state.selectedSideBarOption }
                    />
                } 
            </div>
        )
    }
}

export default SearchResults;