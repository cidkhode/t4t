import React, {Component} from 'react';
import Section from './Section/Section';

class MostPopular extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mostpopular">
                <Section type={"leftPrev"} condensed={3}/>
                <Section type={"rightPrev"} larger={2}/>
            </div>
        )
    }
}
export default MostPopular;