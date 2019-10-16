import React, { Component } from 'react';
import './post.scss';

class Post extends Component {
    render() {
        return (<div 
            className='post' 
            dangerouslySetInnerHTML={this.props.value}>
        </div>);
    }
}

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [{title: 'ex', content: 'welcome'}]
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
        console.log(this.state.posts[0].title);
        /*
        fetch('/posts')
            .then(res => res.json())
            .then(resJSON => {
                console.log(resJSON.name);
                this.state.value = resJSON.name;
            })
            .catch(error => console.log(error));
        */
    }
    render() {
        return (<div 
            className='all-posts'
            dangerouslySetInnerHTML={{__html: this.state.posts[0].content}}>
        </div>)
    }
}

export default Posts;