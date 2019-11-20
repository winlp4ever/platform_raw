import React, { Component } from 'react';
import Comment from '../comment/comment';
import './article.scss';
import MdRender from '../md-render/md-render';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
        }
        this.handleLikes = this.handleLikes.bind(this);
    }

    async componentDidMount() {
        let data = await fetch(`/get-single-post?postId=${this.props.postId}`, {method: 'POST'});
        let response = await data.json();
        this.setState({ post: response.post });
    }

    async handleLikes() {
        try {
            const response = await fetch('/like-a-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    index: this.state.post.index,
                })
            });
            let ans = await response.json();
            ans = ans.answer;
            if (ans == 'y') {
                var post = {};
                Object.assign(post, this.state.post);
                post.likes ++;
                this.setState({post: post});
            }
        } catch(err) {
            console.error(`Error: ${err}`);
        }
    }

    render() {
        return (
            <div
                className='article' 
            >
                <div>
                    <div>
                        <MdRender source={this.state.post.content} />

                    </div>
                </div>

                <div>
                    <div className='post-interact'>
                        <span onClick={this.handleLikes}>
                            <i className="fab fa-gratipay"></i>
                        </span>
                        <span>
                            {this.state.post.likes}
                        </span>
                    </div>
                    <div className='comment-section'>
                        <Comment postId={this.props.postId} />
                    </div>
                
                </div>
                
                
            </div>
        )
    }
}

export default Article;