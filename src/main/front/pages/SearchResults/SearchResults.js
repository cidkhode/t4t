import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

export class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signinOpen: false,
            signupOpen: false,
            sideBarOpen: false,
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

    render() {
        return (
            <div id={'searchresults'}>
                <Navbar handleLogin={ this.props.handleLogin } isLoggedIn={ this.props.isLoggedIn } />
                <div>TEST</div>
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