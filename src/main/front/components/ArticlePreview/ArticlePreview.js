import React from 'react';
import { string, func, number, bool } from 'prop-types';

/* Styles */
import './ArticlePreview.less';

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
                        <input type="button" className={`like ${props.liked ? 'liked' : ''}`} onClick={props.like} id={props.id}/>
                        <button className="save" />
                        {props.type == "topic" && <p className="likes">{props.numLikes}</p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ArticlePreview.propTypes = {
    id: number.isRequired,
    type: string.isRequired,
    image: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    like: func.isRequired,
    liked: bool.isRequired,
};

export default ArticlePreview;