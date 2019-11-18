import React, { Component } from 'react';
import Comment from '../comment/comment';
import './article.scss';
import MdRender from '../md-render/md-render';

class Article extends Component {
    render() {
        return (
            <div
                className='article' 
            >
                <div>
                    <MdRender source={this.props.post.content} />
                </div>
                <div>
                    <Comment postId={this.props.post.index} />
                </div>
                
            </div>
        )
    }
}

export default Article;