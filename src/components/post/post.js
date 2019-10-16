import React, { Component } from 'react';
import './post.scss';

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
        this.state = {
            posts: []
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
        let items = []
        for (const [i, post] of this.state.posts.entries()) {
            items.push(<Post key={i} value={post} />);
        }
        return (<div 
            className='all-posts'>
            {items}
        </div>)
    }
}

export default Posts;