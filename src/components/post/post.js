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
        this.state = {
            posts: [],
            value: ''
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
          //this.fetchData(this.props.userID);
        }
    }

    async componentDidMount() {
        let json = await fetch('/posts');
        let data = await json.json();
        this.setState({posts: data.posts})
    }

    async onClick() {
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
    
    getRawMarkup() {
        const md = new Remarkable();
        return md.render(this.state.value);
    }

    render() {
        let items = []
        for (const [i, post] of this.state.posts.entries()) {
            items.push(<Post key={i} value={post} />);
        }
        return (<div 
            className='all-posts'
            
        >
            <div className="md-editor">
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
                    onClick={_ => this.onClick()}
                >
                    Save
                </button>
            </div>
            {items}
        </div>)
    }
}



export default Posts;