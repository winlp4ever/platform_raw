import React, { Component } from 'react';
import './post.scss';
import $ from 'jquery';
import { Remarkable } from 'remarkable';


class Post extends Component {
    render() {
        return (<div 
            className='post' 
            dangerouslySetInnerHTML={{
                __html: `<h1>${this.props.value.title}</h1><br><p>${this.props.value.content}</p>`
            }}>
        </div>);
    }
}

class Posts extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.savePost = this.savePost.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            posts: [],
            value: ''
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

    async savePost() {
        /**
         * save new post, send it to the server to update posts, then wait
         * for server response and generate new posts
         */
        try {     
            const response = await fetch('/save-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'new post', content: this.state.value })
            });
            let data = await response.json();
            this.setState({posts: data.posts, value: ''});
            $('.all-posts textarea').val('');
        } catch(err) {
            console.error(`Error: ${err}`);
        }
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.savePost();
        }
    }
    
    getRawMarkup() {
        /**
         * create a remarkable obj and use it to convert md code to html
         * in markdown editor
         */
        const md = new Remarkable();
        return md.render(this.state.value);
    }

    renderEditor() {
        /**
         * This function render the Editor inside Posts section
         */
        return (<div className="md-editor">
            <div className="md-render"
                dangerouslySetInnerHTML={{__html: this.getRawMarkup()}}
            />
            <textarea
                rows={1}
                id="enter-text"
                placeholder="Write your new post"
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
        let items = []
        for (const [i, post] of this.state.posts.entries()) {
            items.push(<Post key={i} value={post} />);
        }
        return (<div 
            className='all-posts'
            onKeyPress={this.handleKeyPress}
            >
            {this.renderEditor()}
            {items}
        </div>)
    }
}

export default Posts;