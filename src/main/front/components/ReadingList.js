import React, {Component} from 'react';
import ArticlePrev from './ArticlePrev';

class ReadingList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="readinglist">
                <ArticlePrev viewType="condensed"/>
                <ArticlePrev viewType="condensed"/>
                <ArticlePrev viewType="condensed"/>
                <ArticlePrev viewType="condensed"/>
                <ArticlePrev viewType="condensed"/>
                <ArticlePrev viewType="condensed"/>
            </div>
        )
    }
}
export default ReadingList;