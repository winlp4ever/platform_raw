import './chat.scss';
import React, { Component } from 'react';
import $ from 'jquery';

class Pim extends Component {
    render() {
        return (
            <div>
                <span><a>{this.props.value.userid}</a></span>
                <span>{this.props.value.content}</span>
            </div>
        );
    }
}

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPim: '',
            pims: [{
                userid: 'me',
                content: 'first chit first chat'
            }]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        let json = await fetch('/pims');
        let data = await json.json();
        this.setState({pims: data})
    }

    handleChange(event) {
        this.setState({newPim: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/new-pim', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userid: 'me',
                content: this.state.newPim
            })
        });
        let data = await response.json();
        this.setState({
            newPim: '',
            pims: data
        })
        console.log(data);
    }

    render() {
        let chats = [];
        for (const [i, pim] of this.state.pims.entries()) {
            chats.push(<Pim value={pim} key={i} />);
        }
        return (<div
            className='chat'
        >
            {chats}
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='your pim' value={this.state.newPim} onChange={this.handleChange}></input>
            </form>
        </div>);
    }
}

export default Chat;