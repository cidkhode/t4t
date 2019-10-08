import React, {Component} from 'react';

class Searchbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="searchBar">
                <button><img src={searchPic}/></button>
                <input type="text" placeholder="Search Thought4Thought"></input>
            </div>
        );
    }
}
export default Searchbar;