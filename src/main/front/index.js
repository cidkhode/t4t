import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Components */
import MainPage from './pages/MainPage/';
import UserAccount from './pages/UserAccount/';
import UserDashboard from './pages/UserDashboard/';

/* Styles */
import './index.css';

/* Redux Store */
import store from './redux/store.js';
import CustomRouter from "./components/CustomRouter/CustomRouter";
import { getUserLoggedIn } from "./utils/utils";

export class Thought4Thought extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccountDetails: {}
    };
  }

  componentDidMount() {
    const userEmail = getUserLoggedIn();
    if (userEmail) {
      fetch('/api/get-user-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail })
      }).then(resp => resp.json())
        .then(json => {
          if (json.status === 0) {
            this.getProfile();
          } else {
            this.setState({
              isLoggedIn: false,
            })
          }
        });
    }
  }

  onLogin = () => {
    this.getProfile();
    this.props.history.push('/account');
  };

  // TODO: we will be fetching all this info later on...
  getSavedArticles = () => [{
    title: 'Mock Article 1',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 2',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 3',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 4',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 5',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 6',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 7',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 8',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }, {
    title: 'Mock Article 9',
    author: 'Cid Khode',
    image: 'https://picsum.photos/450/285',
    description: 'Some description we might need somewhere else in the project so we\'re keeping it as a prop for now.'
  }];

  getFollowingUsers = () => [{
    followingUserName: 'Bernin Uben',
    followingUserEmail: 'bernin@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Sang Nguyen',
    followingUserEmail: 'sang@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Olivia Zurek',
    followingUserEmail: 'olivia@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Vincent Tran',
    followingUserEmail: 'vincent@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Ariel Verzosa',
    followingUserEmail: 'ariel@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Emad Khalid',
    followingUserEmail: 'emad@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Derek Leckner',
    followingUserEmail: 'derek@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }, {
    followingUserName: 'Marc Roberts',
    followingUserEmail: 'marc@fakeemail.com',
    followingUserImage: 'https://i.pravatar.cc/120'
  }];

  getProfile = () => {
    const userEmail = getUserLoggedIn();
    if (userEmail) {
      fetch(`/api/user?userEmail=${userEmail}`)
        .then(resp => {
          return resp.json();
        })
        .then(userAccountDetails => {
          this.setState({
            isLoggedIn: true,
            userAccountDetails: {
              ...userAccountDetails,
              name: `${userAccountDetails.firstName} ${userAccountDetails.lastName}`,
              interests: userAccountDetails.interests ? userAccountDetails.interests.split(',').map(interest => ({ title: interest })) : [],
              viewPoints: userAccountDetails.viewPoints ? userAccountDetails.viewPoints.split(',').map(viewPoint => ({ title: viewPoint })) : [],
            },
          })
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    return (
      <Provider store={ store }>
        { this.state.isLoggedIn ?
          <Router>
            <>
              <Switch>
                <Route path="/account">
                  <CustomRouter
                    isLoggedIn={ this.state.isLoggedIn }
                    component={ UserAccount }
                    componentProps={ {
                      getProfile: this.getProfile,
                      userAccountDetails: this.state.userAccountDetails,
                      savedArticles: this.getSavedArticles(),
                      followingUsers: this.getFollowingUsers(),
                    } }
                  />
                </Route>
                <Route path="/dashboard">
                  <CustomRouter
                    isLoggedIn={ this.state.isLoggedIn }
                    component={ UserDashboard }
                    componentProps={ {
                      interests: this.state.userAccountDetails.interests,
                      pointsOfView: this.state.userAccountDetails.viewPoints,
                      userAccountDetails: this.state.userAccountDetails,
                      allArticles: this.getSavedArticles(),
                      latestArticles: this.getSavedArticles(),
                    }}
                  />
                </Route>
                <Route path="/">
                  <MainPage isLoggedIn />
                </Route>
              </Switch>
            </>
          </Router> :
          <MainPage
            isLoggedIn={ false }
            handleLogin={ this.onLogin }
            showSidebar={ false }
          />
        }
      </Provider>
    )
  }
}

ReactDOM.render(<Thought4Thought />, document.getElementById('thought4thought-app'));