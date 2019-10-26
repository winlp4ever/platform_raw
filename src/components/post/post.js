import React, { Component } from 'react';


export default class Post extends Component {
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
                    likes={this.props.likes}
                >
                    <span><i className="fab fa-gratipay"></i></span><span>23</span>
                </div>

        </div>);
    }
}