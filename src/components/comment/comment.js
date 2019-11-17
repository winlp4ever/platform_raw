import React, { Component } from 'react';
import { autoResize } from './utils';
import './comment.scss';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    async componentDidMount() {
        let data = await fetch(`/postComment?postId=${this.props.postId}`, {method: 'POST'});
        let response = await data.json()
        this.setState({
            comments: await response.comments
        })
        await this.submitComment();
        autoResize();
    }

    handleChange(e) {
        this.setState({newComment: e.target.value})
    }

    async submitComment() {
        $('.comment').on('keydown', 'textarea', async e => {
            let keycode = e.keyCode | e.which;
            if (keycode != 13) return;
            await fetch(`/submitComment?postId=${this.props.postId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    newComment: this.state.newComment
                })
            });
            let comments = this.state.comments;
            comments.push(this.state.newComment);
            this.setState({
                comments: comments,
                newComment: ''
            })
            $('.comment textarea').val('');
        })
        
    } 

    render() {
        let spans = [];
        for(const [i, comm] of this.state.comments.entries()) {
            spans.push(<span key={i}>{comm}</span>);
        }
        return (
            <div 
                className='comment'
            >
                <textarea
                    className='enter-comment' 
                    rows={1}
                    placeholder='type your comment here'
                    onChange={this.handleChange}
                ></textarea>
                {spans}
            </div>
        )
    }
}

export default Comment;