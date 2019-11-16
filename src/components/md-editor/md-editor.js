import React, { Component } from 'react';
import './md-editor.scss';
import hljs from 'highlight.js';
import { autoResize, keysBehaviours } from './autoresize_textarea';
import { Remarkable } from 'remarkable';


class MdEditor extends Component {
    constructor(props) {
        super(props);
        this.savePost = this.savePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newPost: {
                content: ''
            }
        }
    }

    async componentDidMount() {
        autoResize();
        keysBehaviours();
    }

    handleChange(e) {
        this.setState({newPost: {
            content: e.target.value
        }})
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
                    newPost: {
                        content: '',
                    }
                });
                $('.md-editor textarea').val('');
            }
            
        } catch(err) {
            console.error(`Error: ${err}`);
        }
    }

    render() {
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
}

export default MdEditor;