import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import './article.scss';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            likes: 0
        }
    }

    render() {
        return (
            <div
                className='article'
            >
                <ReactMarkdown
                    source={this.state.title}
                />
                <ReactMarkdown
                    source={this.state.content} 
                />
            </div>
        )
    }
};

export default Article;