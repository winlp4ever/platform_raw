import React, { Component } from 'react';
import Comment from '../comment/comment';
import './article.scss';

class Article extends Component {
    render() {
        return (
            <div
                className='article' 
            >
                <div dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>
                <div>
                    <Comment postId={this.props.post.index} />
                </div>
                
            </div>
        )
    }
}

export default Article;