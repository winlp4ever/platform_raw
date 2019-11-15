import React, { Component } from 'react';

export default class Post extends Component {
    async componentDidMount() {

    }
    render() {
        return (
            <div 
                className='post'
            >
                <button className='del-post' onClick={_ => this.props.onClick()}>
                    <i className="fas fa-times"></i>
                </button>
                <button >
                    <i className="fas fa-external-link-alt"></i>
                </button>
                
                <div 
                    dangerouslySetInnerHTML={{
                        __html: `${this.props.value.content}`
                    }}
                />
                <div
                    className='post-interact'
                >
                    <span 
                        onClick={_ => this.props.onLike()}
                    >
                        <i className="fab fa-gratipay"></i>
                    </span>
                    <span>{this.props.value.likes}</span>
                </div>
            </div>
        );
    }
}