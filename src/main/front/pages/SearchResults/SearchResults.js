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
            filter: "",
            results: [],
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

    changeFilter = (value) => {
      this.setState({filter: value})
    }

    render() {
        return (
            <div>
                <Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } />
                <div className="searchContent">
                  <div className="searchInfo">
                    <div className="searchFilters">
                      Filter:
                      <input type="radio" onClick={this.changeFilter("all")}/>
                      <input type="radio" onClick={this.changeFilter("article")}/>
                      <input type="radio" onClick={this.changeFilter("topic")}/>
                      <input type="radio" onClick={this.changeFilter("user")}/>
                    </div>
                    <div className="searchQuery">
                      You searched for: "{this.props.query}"
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