import React from 'react';
import { string } from 'prop-types';
import ProPic from '../../assets/PlaceholderProPic';


export const ResultPreview = props => (
    <div className={`result ${props.type}`} onClick={props.redirect}>
        <img src={ProPic}/>
        <div className={`info`}>
            <div className={`title`}>{props.title}</div>
            <div className={`desc`}>{props.desc}</div>
        </div>
        {props.type == 'user' && <button className={`follow`}>Follow</button>}
    </div>
);

ResultPreview.propTypes = {
    type: string.isRequired,
    picture: string.isRequired,
    title: string.isRequired,
    desc: string.isRequired,
};