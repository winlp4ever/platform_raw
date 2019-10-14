import { Remarkable } from 'remarkable';
import React, { Component } from 'react';
import './mdEditor.scss';
import './utils';

class MdEditor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: '' };
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    
    getRawMarkup() {
        const md = new Remarkable();
        return md.render(this.state.value);
    }

    render() {
        return (
            <div className="md-editor">
                <div className="md-render"
                    dangerouslySetInnerHTML={{__html: this.getRawMarkup()}}
                />
                <textarea
                    rows={1}
                    id="enter-text"
                    placeholder="Write your new post"
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                />
                <button id='save-post'>Save</button>
            </div>
        );
    }
}

export default MdEditor;