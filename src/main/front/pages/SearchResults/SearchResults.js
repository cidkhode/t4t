import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import ResultPreview from '../../components/ResultPreview/ResultPreview';
import { getSearchResults } from '../../redux/selectors/navbar.selector';
import { Link } from 'react-router-dom';

import './SearchResults.less';

export class SearchResults extends Component {
    constructor(props) {
        super(props);
        console.dir(props);

        this.state = {
            scrollInterval: 0,
            signinOpen: false,
            signupOpen: false,
            sideBarOpen: false,
            filter: "article",
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
                <Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn }/>
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
                    {this.props.searchResults.length > 0 && this.props.searchResults.map((item, key) => 
                      <Link to={`/article/${item.articleID}`}>
                        <ResultPreview 
                          type={'user'}
                          picture={'https://picsum.photos/150'}
                          title={ item.title }  
                          desc={ item.description }
                          key={ key }
                        />
                      </Link>
                    )}
                    {this.props.searchResults.length == 0 && <div>No results found.</div>}
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

const mapStateToProps = state => ({
	searchResults: getSearchResults(state),
});

export default connect(mapStateToProps)(SearchResults);