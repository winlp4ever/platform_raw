import React, { Component } from 'react';
import './post.scss';
import $ from 'jquery';
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';
import { autoResize, keysBehaviours } from './autoresize_textarea';
import Post from './post';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    async componentDidMount() {
        /**
         * Request posts from server and update data on front end
         */
        let json = await fetch('/posts');
        let data = await json.json();
        this.setState({posts: data.posts})
    }

    async delPost(i) {
        try {
            const pass = prompt('Enter password:');
            const response = await fetch('/del-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    index: i,
                    password: pass 
                })
            });
            let acceptOrNot = await response.json();
            acceptOrNot = acceptOrNot.answer
            if (acceptOrNot == 'y') {
                var posts_ = this.state.posts.slice();
                posts_.splice(i, 1);
                this.setState({posts: posts_});
            }
        } catch(err) {
            console.error(`Error: ${err}`);
        }
    }

    async handleLikes(i) {
        try {
            const response = await fetch('/like-a-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    index: i,
                })
            });
            let ans = await response.json();
            ans = ans.answer;
            if (ans == 'y') {
                var posts_ = this.state.posts.slice();
                posts_[i]['likes'] ++;
                this.setState({posts: posts_});
            }
        } catch(err) {
            console.error(`Error: ${err}`);
        }
    }


    render() {
        let items = [];
        for (const [i, post] of this.state.posts.entries()) {
            items.push(
                <Post 
                    key={i} 
                    value={post} 
                    onClick={_ => this.delPost(i)}
                    onLike={_ => this.handleLikes(i)}
                />
            );
        }
        return (
            <div 
                className='all-posts'
                //onKeyPress={this.handleKeyPress}
            >
                {items}
            </div>
        )
    }
}

export default Posts;