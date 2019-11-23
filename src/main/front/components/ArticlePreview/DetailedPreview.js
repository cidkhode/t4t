import React from 'react';
import { string, func } from 'prop-types';

/* Styles */
import './ArticlePreview.less';

/* Images */
import Save from '../../assets/bookmark.png';
import Author from '../../assets/fillerUserPic.png';

export const DetailedPreview = props => (
    <div className={`t4t-article detailed`}>
        <div className="article-info">
            <img className="user" src={Author} alt={'User'} />
            <p className="article-description">{props.description}</p>
        </div>

        <div className="article-pic">
            <img src={props.image} alt={"Image Missing"}/>
        </div>

        <div className="article-text">
            <h3 className="article-title">{props.title}</h3>
            <img className="save" src={Save} alt={'Save'} />
        </div>
    </div>
);

DetailedPreview.propTypes = {
    image: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
}
export default DetailedPreview;