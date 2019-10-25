import React from 'react';
import { string } from 'prop-types';

/* Styles */
import './ArticlePreview.less';

/* Images */
import Like from '../../assets/like.png';
import Save from '../../assets/bookmark.png';

export const ArticlePreview = props => (
    <div className={`t4t-article ${props.type}`}>
        <div className="article-pic">
            <img src={props.image} alt={"Image Missing"}/>
        </div>

        <div className="article-info">
            <div className="article-text">
                <h3 className="article-title">{props.title}</h3>
                <div className="article-misc">
                    <p className="article-description">{props.description}</p>
                    <div className="article-actions">
                        <img className="like" src={Like} alt={'Like'}/>
                        <img className="save" src={Save} alt={'Save'}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ArticlePreview.propTypes = {
    type: string.isRequired,
    image: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
};

export default ArticlePreview;