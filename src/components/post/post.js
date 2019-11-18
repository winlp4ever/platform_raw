import React, { Component } from 'react';
//import ReactMarkdown from 'react-markdown';
import MdRender from '../md-render/md-render';
import ReactMarkdown from 'react-markdown';

export default class Post extends Component {
    async componentDidMount() {

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
                    <span 
                        onClick={_ => this.props.onLike()}
                    >
                        <i className="fab fa-gratipay"></i>
                    </span>
                    <span>{this.props.post.likes}</span>
                </div>
            </div>
        );
    }
}