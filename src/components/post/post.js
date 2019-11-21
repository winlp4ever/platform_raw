import React, { Component } from 'react';
import MdRender from '../md-render/md-render';
import $ from 'jquery';

function disableDoubleClick() {
    $('.post .post-interact i').on('mousedown', e => {
        e.preventDefault();
    });
}

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentLength: '..'
        }
    }
    async componentDidMount() {
        // behaviors
        disableDoubleClick();
        let data = await fetch(`/get-comment-size?postId=${this.props.post.index}`, {method: 'POST'});
        let response = await data.json();
        this.setState({ commentLength: response.len });
    }

    render() {
        return (
            <div 
                className='post'
            >
                <button className='del-post' onClick={_ => this.props.onClick()}>
                    <i className="fas fa-times"></i>
                </button>
                <button onClick={_ => this.props.viewPost(this.props.post)}>
                    <i className="fas fa-external-link-alt"></i>
                </button>
                
                <div>
                    <MdRender source={this.props.post.content} />
                </div>
                <div
                    className='post-interact'
                >
                    <div>
                        <span 
                            onClick={_ => this.props.onLike()}
                        >
                            <i className="fab fa-gratipay"></i>
                        </span>
                        <span>{this.props.post.likes}</span>
                    </div>
                    <div>
                        <span>
                            <i className="fas fa-comment-dots"></i>
                        </span>
                        <span>{this.state.commentLength}</span>
                    </div>

                </div>
            </div>
        );
    }
}