import React, {Component} from 'react';
import Searchbar from '../Searchbar/Searchbar';
import searchPic from '../../assets/search.png';
import './HeaderBar.less';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            signUpWindow: false,
        }
    }

    handleButtonClick = () => {
        this.setState(signUpWindow);
    };

    render() {
        return (
            <div class="navhead">
                <button className="logo">LOGO</button>
                <div class="searchBar">
                    <button><img src={searchPic}/></button>
                    <input type="text" placeholder="Search Thought4Thought"></input>
                </div>
                <button className="signIn">Sign in</button>
                <button className="signUp">Get started</button>
            </div>
        );
    }
}
export default Navbar;