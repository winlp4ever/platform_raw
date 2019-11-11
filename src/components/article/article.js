import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import './article.scss';

class Article extends Component {
    render() {
        return (
            <div className='article'>
                {this.props.content}
            </div>
        )
    }
};

export default Article;