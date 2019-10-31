import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LOCAL_STORAGE_KEYS } from "./utils/constants";
import './index.css';
import MainPage from './pages/MainPage';
import UserAccount from './pages/UserAccount';

export class Thought4Thought extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccountDetails: {
        name: 'Cid Khode',
        email: 'cid@unrealmail.com',
        image: 'https://i.pravatar.cc/175',
        about: 'Arielius tryus toum editatium abouticus ipsum.'
      }
    };
  }
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

  getUserAccountDetails = () => ({
    name: 'Cid Khode',
    email: 'cid@fakeemail.com',
    image: 'https://i.pravatar.cc/175',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  });

  getInterests = () => [
    { title: 'Some interest 1' },
    { title: 'Some interest 2' },
    { title: 'Some interest 3' },
    { title: 'Some interest 4' },
    { title: 'Some long long interest 5' },
    { title: 'Some interest 6' },
    { title: 'Some interest 7' },
    { title: 'Some interest 8' },
  ];

  getPointsOfView = () => [
    { title: 'Some view 1' },
    { title: 'Some view 2' },
    { title: 'Some view 3' },
    { title: 'Some view 4' },
    { title: 'Some view 5' },
    { title: 'Some view 6' },
    { title: 'Some view 7' },
    { title: 'Some view 8' },
  ];

  getProfile = () => {
    fetch(`/api/user?userEmail=${localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL)}`)
    .then(resp => {
      return resp.json();
    })
    .then(json => {
      const { profilePictureURL } = json;
      this.setState({
        userAccountDetails: {
          ...this.state.userAccountDetails,
          image: profilePictureURL
        }
      })
    })
    .catch(err => console.error(err));
  };

  render() {
    return (
		<div>
       {/*<MainPage />*/}
        <UserAccount
        getProfile={ this.getProfile }
        interests={ this.getInterests() }
        pointsOfView={ this.getPointsOfView() }
        userAccountDetails={ this.state.userAccountDetails }
        savedArticles={ this.getSavedArticles() }
        followingUsers={ this.getFollowingUsers() }
      />
		</div>
    )
  }
}

ReactDOM.render(<Thought4Thought />, document.getElementById('thought4thought-app'));