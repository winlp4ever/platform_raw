import React, { Component } from 'react';
import './urn.scss';

class Urn extends Component {
    render() {
        return (
            <div className='urn'
                dangerouslySetInnerHTML={{__html: this.props.html}}    
            >
            </div>
        )
    }
}

export default Urn;