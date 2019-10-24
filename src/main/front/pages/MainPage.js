import React, { Component } from 'react';

/* Components */
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";

import SampleImage from "../assets/fillerArticlePic.png";

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
      readingListArticles: [0,1,2,3,4,5],
      networkArticles: [0,1],

      MainContent: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        margin: 'auto',
        maxHeight: '1080px',
        width: '100%',
        fontFamily: 'Roboto',
      },
      MostPopular: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
        maxHeight: '600px',
        marginRight: 'auto',
        paddingBottom: '25px',
        paddingLeft: '70px',
        width: '50%',
      },
      ReadingList: {
        float: 'right',
        marginLeft: 'auto',
        paddingRight: '125px',
        display: 'flex',
        flexDirection: 'column',
      },
      NetworkNews: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        marginRight: 'auto',
        paddingLeft: '40px',
        flexWrap: 'wrap',
        paddingBottom: '25px',
      }
    };
  }

  updateWindow = () => {
    console.log(window.innerWidth);
    if(window.innerWidth >= 1300) {
      const main = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexFlow: 'column wrap',
        margin: 'auto',
        maxHeight: '1080px',
        width: '100%',
        fontFamily: 'Roboto',
      }
      const popular = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'column',
        maxHeight: '600px',
        marginRight: 'auto',
        paddingBottom: '25px',
        paddingLeft: '70px',
        width: '60%',
      }
      const network = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        marginRight: 'auto',
        paddingLeft: '40px',
        flexWrap: 'wrap',
        paddingBottom: '25px',
      }
      const reading = {
        float: 'right',
        marginLeft: 'auto',
        paddingRight: '125px',
        display: 'flex',
        flexDirection: 'column',
      }
      this.setState({MainContent: main, MostPopular: popular, ReadingList: reading, NetworkNews: network});
    } else if(window.innerWidth < 1300 && window.innerWidth > 700) {
      const main = {
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          flexFlow: 'column wrap',
          justifyContent: 'center',
          margin: 'auto',
          width: '100%',
          fontFamily: 'Roboto',
      }
      const popular = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '600px',
        justifyContent: 'center',
        paddingBottom: '25px',
        border: '0.1rem solid black',
      }
      const network = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingLeft: '40px',
        flexWrap: 'wrap',
        paddingBottom: '25px',
      }
      const reading = {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
      }
      this.setState({MainContent: main, MostPopular: popular, ReadingList: reading, NetworkNews: network});
    } else if(window.innerWidth <= 700) {
      const main = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexFlow: 'column wrap',
        width: '100%',
        fontFamily: 'Roboto',
      }
      const popular = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: '25px',
        border: '0.1rem solid black',
      }
      const network = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 'auto',
        flexWrap: 'wrap',
        paddingBottom: '25px',
      }
      const reading = {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }
      this.setState({MainContent: main, MostPopular: popular, ReadingList: reading, NetworkNews: network});
    }
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

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
  }

  componentWillMount() {
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  render() {
    return (
      <div>
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
        <div style={ this.state.MainContent }>
          <h1 style={ SectionHeader }>Most Popular From Today</h1>
          <div style={ this.state.MostPopular }>
            {this.state.mostPopularArticles.map((item) => 
            <ArticlePreview
              type={"horizontal"}
              image={SampleImage}
              title={"NJIT Student attempts to code a website unsuccessfully"}
              description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
            />)}
            {this.state.mostPopularBig.map((item) => 
            <ArticlePreview
              type={"vertical"}
              image={SampleImage}
              title={"NJIT Student attempts to code a website unsuccessfully"}
              description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
            />)}
          </div>
          <h1 style={ SectionHeader }>News From Your Network</h1>
          <div style={ this.state.NetworkNews }>
            {this.state.networkArticles.map((item) => 
              <ArticlePreview
                type={"vertical"}
                image={SampleImage}
                title={"NJIT Student attempts to code a website unsuccessfully"}
                description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
            />)}
          </div>
          <div style={ this.state.ReadingList }>
            <h1 style={{ color: '#828282' }}>Reading List</h1>
            {this.state.readingListArticles.map((item) => 
              <ArticlePreview
                type={"horizontal"}
                image={SampleImage}
                title={"NJIT Student attempts to code a website unsuccessfully"}
                description={"A lot of filler text that I actually spent time to write, but simply to test the design and overall look of this article preview, and it seems like it's going to work, but who knows"}
            />)}
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage;


/*  -----------------------------------------------------  STYLES  -----------------------------------------------------  */

const MainContent = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  flexFlow: 'column wrap',
  flexBasis: '50%',
  margin: 'auto',
  maxHeight: '1080px',
  width: '100%',
  fontFamily: 'Roboto',
}

const SectionHeader = {
  color: '#828282',
  marginRight: 'auto',
  paddingLeft: '40px',
}

const MostPopular = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  maxHeight: '600px',
  marginRight: 'auto',
  paddingBottom: '25px',
  paddingLeft: '70px',
  width: '50%',
}

const ReadingList = {
  float: 'right',
  marginLeft: 'auto',
  paddingRight: '125px',
  display: 'flex',
  flexDirection: 'column',
}

const NetworkNews = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '50%',
  marginRight: 'auto',
  paddingLeft: '40px',
  flexWrap: 'wrap',
  paddingBottom: '25px',
}