import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import ResultPreview from '../../components/ResultPreview/ResultPreview';

import './SearchResults.less';

export class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollInterval: 0,
            signinOpen: false,
            signupOpen: false,
            sideBarOpen: false,
            filter: "article",
            results: [0,1,2,3,4,5,6,7,8,9,10,11],
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
      this.refs.results.scroll({top: 0, left: 0, behavior: 'smooth'});
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
                        <span><input type="radio" name="filter" value="all" disabled={true} onChange={this.changeFilter} checked={this.state.filter == "all"}/><span>Show All</span></span>
                        <span><input type="radio" name="filter" value="article" onChange={this.changeFilter} checked={this.state.filter == "article"}/><span>Articles</span></span>
                        <span><input type="radio" name="filter" value="topic" disabled={true} onChange={this.changeFilter} checked={this.state.filter == "topic"}/><span>Topics</span></span>
                        <span><input type="radio" name="filter" value="user" disabled={true} onChange={this.changeFilter} checked={this.state.filter == "user"}/><span>Users</span></span>
                      </form>
                    </div>
                    <div className="searchQuery">
                      You searched for: "<span style={{fontWeight: "700"}}>{this.props.query ? this.props.query : "Important Writer Dude"}</span>"
                    </div>
                  </div>
                  <div className="searchResults" ref="results">
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