import React, { Component } from 'react';
import Comment from '../comment/comment';
import './article.scss';
import ReactMarkdown from 'react-markdown';

class Article extends Component {
    render() {
        return (
            <div
                className='article' 
            >
                <div>
                    <ReactMarkdown source={this.props.post.content} />
                </div>
                <div>
                    <Comment postId={this.props.post.index} />
                </div>
                
            </div>
        )
    }
}

export default Article;