import React, {Component} from 'react';
import ArticlePrev from './ArticlePrev';

class NetworkNews extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="networknews">
                <ArticlePrev viewType="author"/>
                <ArticlePrev viewType="author"/>
            </div>
        )
    }
}
export default NetworkNews;