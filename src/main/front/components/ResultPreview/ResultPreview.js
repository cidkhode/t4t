import React from 'react';
import { string } from 'prop-types';
import ProPic from '../../assets/PlaceholderProPic.png';

import './ResultPreview.less';


export const ResultPreview = props => (
    <div className={`result ${props.type}`} onClick={props.redirect}>
        <div className={`image`}><img src={props.type == 'user' ? ProPic : props.picture}/></div>
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

export default ResultPreview;