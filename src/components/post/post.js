import React, { Component } from 'react';


export default class Post extends Component {
    async componentDidMount() {

    }
    render() {
        return (<div 
            className='post'
            >
                <button className='del-post' onClick={_ => this.props.onClick()}>
                    &times;
                </button>
                <div 
                    dangerouslySetInnerHTML={{
                        __html: `
                            <h1>${this.props.value.title}</h1><br>
                            <p>${this.props.value.content}</p>`
                        }}
                />
                <div
                    className='post-interact'
                >
                    <span><i className="fab fa-gratipay"></i></span>
                    <span onClick={_ => this.props.onLike()}>{this.props.value.likes}</span>
                </div>

        </div>);
    }
}