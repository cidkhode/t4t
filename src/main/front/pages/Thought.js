import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIsLoading, getIsLoggedIn, getUserAccountDetails, getWaitingToCheck } from '../redux/selectors/user.selector';
import { checkIfUserLoggedIn, fetchUserAccountDetails } from '../redux/actions/user.action';

import { getUserLoggedIn } from '../utils/utils';
import CustomRouter from '../components/CustomRouter/CustomRouter';
import UserAccount from './UserAccount/UserAccount';
import UserDashboard from './UserDashboard/UserDashboard';
import MainPage from './MainPage';
import { LoadingIcon } from '../components/LoadingIcon/LoadingIcon';

export class Thought extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccountDetails: {}
    }
  }

  componentDidMount() {
    const userEmail = getUserLoggedIn();
    this.props.checkIfUserLoggedIn(userEmail)
      .then(resp => {
        if (resp.result.status === 0) {
          this.props.fetchUserAccountDetails(userEmail);
        }
      });
  }

  // TODO: we will be fetching all this info later on...
  getSavedArticles = () => {
    return
    [{
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
  };

  getFollowingUsers = () => [
    {
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
      return fetch(`/api/user?userEmail=${userEmail}`)
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
      (this.props.isLoading || this.props.waitingToCheck) ? <LoadingIcon /> :
      <Router>
        <>
          <Switch>
            <Route path="/account">
              <CustomRouter
                component={ UserAccount }
                isLoggedIn={ this.props.isLoggedIn }
                componentProps={ {
                  getProfile: this.getProfile,
                  savedArticles: this.getSavedArticles(),
                  followingUsers: this.getFollowingUsers(),
                } }
              />
            </Route>
            <Route path="/dashboard">
              <CustomRouter
                component={ UserDashboard }
                isLoggedIn={ this.props.isLoggedIn }
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
              <MainPage isLoggedIn={ this.props.isLoggedIn } showSidebar={ this.props.isLoggedIn }/>
            </Route>
          </Switch>
        </>
      </Router>
    )
  }
}

Thought.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  checkIfUserLoggedIn: PropTypes.func.isRequired,
  fetchUserAccountDetails: PropTypes.func.isRequired,
  userAccountDetails: PropTypes.object.isRequired,
  waitingToCheck: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  isLoggedIn: getIsLoggedIn(state),
  userAccountDetails: getUserAccountDetails(state),
  waitingToCheck: getWaitingToCheck(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ checkIfUserLoggedIn, fetchUserAccountDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Thought)