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
        this.savePost = this.savePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            posts: [],
            newPost: {
                content: '',
            }
        }
    }

    async componentDidMount() {
        /**
         * Request posts from server and update data on front end
         */
        autoResize();
        keysBehaviours();
        let json = await fetch('/posts');
        let data = await json.json();
        this.setState({posts: data.posts})
    }

    async savePost() {
        /**
         * save new post, send it to the server to update posts, then wait
         * for server response and generate new posts
         */
        try {    
            let content = this.getRawMarkup();
            
            let h1array = content.match(/\<h1\>.*\<\/h1\>/g);
            if (!h1array) return;
            let title = h1array[0];
            title = title.substr(4, title.length-9);
            console.log(`title is: ${title}`);

            let pass = prompt('Enter password:'); 
            const response = await fetch('/save-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: title,
                    content: content,
                    password: pass 
                })
            });
            let data = await response.json();
            let ans = data.answer;
            if (ans == 'y') {
                this.setState({
                    posts: data.posts,
                    newPost: {
                        content: '',
                    }
                });
                $('.all-posts textarea').val('');
            }
            
        } catch(err) {
            console.error(`Error: ${err}`);
        }
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

    handleChange(e) {
        this.setState({newPost: {
            content: e.target.value
        }})
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.savePost();
        }
    }
    

    getRawMarkup() {
        const md = new Remarkable({
            //langPrefix: 'hljs language-',
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (err) {}
                }
          
                try {
                    return hljs.highlightAuto(str).value;
                } catch (err) {}
          
                return ''; // use external default escaping
            }
        });        
        return md.render(this.state.newPost.content);
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

    renderEditor() {
        /**
         * This function render the Editor inside Posts section
         */
        return (<div className="md-editor">
            <div className="md-render"
                dangerouslySetInnerHTML={{
                    __html: this.getRawMarkup()
                }}
            />
            
            <textarea
                className='md-input'
                rows={1}
                id="enter-content"
                placeholder="Write your post's content"
                onChange={this.handleChange}
                defaultValue={''}
            />
            <button 
                id='save-post'
                onClick={this.savePost}
            >
                Save
            </button>
        </div>);
    }

    render() {
        let items = [];
        for (const [i, post] of this.state.posts.entries()) {
            items.push(
                <Post 
                    userinfo={post.userinfo}
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
                {this.renderEditor()}
                {items}
            </div>
        )
    }
}

export default Posts;