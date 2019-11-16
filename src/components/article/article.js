import React, { Component } from 'react';

import './article.scss';

class Article extends Component {
    render() {
        return (
            <div
                className='article' dangerouslySetInnerHTML={{__html: this.props.html}}
            >
            </div>
        )
    }
}

export default Article;