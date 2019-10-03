import React, {Component} from 'react';
import Blank from '../assets/fillerArticlePic.png';
import Like from '../assets/like.png';
import Bookmark from '../assets/bookmark.png';
import User from '../assets/fillerUserPic.png';

class ArticlePrev extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewType: this.props.viewType,
            articleImage: Blank,
        }
    }

    render() {
        return (
            <div className={"article " + this.state.viewType}>
                <img src={this.state.articleImage} className="prevImg" alt="Image"/>
                <div className="articleInfo">
                    <div className="articleTitle">TEXT TEXT TEXT TEXTT</div>
                    <div className="articleDesc">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</div>
                    {this.state.viewType != "author" && <img src={Bookmark} className="bookmark" alt="Bookmark"/>}
                    {this.state.viewType != "author" && <img src={Like} className="like" alt="Like"/>}
                    {this.state.viewType == "author" && <img src={User} className="userpic" alt="User"/>}
                </div>
            </div>
        );
    }
}
export default ArticlePrev;