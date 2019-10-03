import React, {Component} from 'react';
import ArticlePrev from './ArticlePrev';

class MostPopular extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mostpopular">
                <div className="leftPrev">
                    <ArticlePrev viewType="condensed"/>
                    <ArticlePrev viewType="condensed"/>
                    <ArticlePrev viewType="condensed"/>
                </div>
                <div className="rightPrev">
                    <ArticlePrev viewType="larger"/>
                    <ArticlePrev viewType="larger"/>
                </div>
            </div>
        )
    }
}
export default MostPopular;