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
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            posts: [],
            newPost: {
                title: '',
                content: '',
                likes: 0
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
            let pass = prompt('Enter password:'); 
            const response = await fetch('/save-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: this.getTitleRawMarkup(), 
                    content: this.getContentRawMarkup(),
                    password: pass 
                })
            });
            let data = await response.json();
            this.setState({
                posts: data.posts,
                newPost: {
                    title: '',
                    content: '',
                    like: 0
                }
            });
            $('.all-posts textarea').val('');
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

    handleTitleChange(e) {
        this.setState({newPost: {
            title: e.target.value, 
            content: this.state.newPost.content
        }});
    }

    handleContentChange(e) {
        this.setState({newPost: {
            title: this.state.newPost.title,
            content: e.target.value
        }})
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.savePost();
        }
    }
    
    getTitleRawMarkup() {
        /**
         * create a remarkable obj and use it to convert md code to html
         * in markdown editor
         */
        const md = new Remarkable();         
        return md.render(this.state.newPost.title);
    }

    getContentRawMarkup() {
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
            ans = response.answer
            if (ans == 'y') {
                var posts_ = this.state.posts.slice();
                posts_[i][likes] ++;
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
                    __html: `<h1>${this.getTitleRawMarkup()}</h1>` + 
                        this.getContentRawMarkup()
                }}
            />
            <textarea
                className='md-input'
                rows={1}
                id="enter-title"
                onChange={this.handleTitleChange}
                placeholder="Write your post's title" 
            />
            <textarea
                className='md-input'
                rows={1}
                id="enter-content"
                placeholder="Write your post's content"
                onChange={this.handleContentChange}
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
        let items = []
        for (const [i, post] of this.state.posts.entries()) {
            items.push(<Post key={i} value={post} onClick={_ => this.delPost(i)}/>);
        }
        return (<div 
                className='all-posts'
                //onKeyPress={this.handleKeyPress}
            >
            {this.renderEditor()}
            {items}
        </div>)
    }
}

export default Posts;