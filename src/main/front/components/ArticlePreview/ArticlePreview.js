import React from 'react';
import {
    string
} from 'prop-types';

import './ArticlePreview.less';

import Like from '../../assets/like.png';
import Save from '../../assets/bookmark.png';

export const ArticlePreview = props => (
    <div className={`t4t-article ${ props.type }`}>
        <img className={`article-pic`} src={ props.image } alt={"Image Missing"}/>
        <div className={`article-info`}>
            <div className={`article-title`}>{props.title}</div>
            <div className={`article-description`}>{props.description}</div>
            <img className="like" src={Like} alt={'Like'}/>
            <img className="save" src={Save} alt={'Save'}/>
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