import React, {Component} from 'react';
import ArticlePrev from '../ArticlePrev/ArticlePrev';
import './Section.less';

export default class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            author: this.props.author,
            condensed: this.props.condensed,
            larger: this.props.larger
        }
    }

    render() {
        return (
            <div className={this.state.type}>
                {this.state.author && Array(this.state.author).fill(<ArticlePrev viewType="author"/>)}
                {this.state.condensed && Array(this.state.condensed).fill(<ArticlePrev viewType="condensed"/>)}
                {this.state.larger && Array(this.state.larger).fill(<ArticlePrev viewType="larger"/>)}
            </div>
        );
    }
}