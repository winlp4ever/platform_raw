import React, { Component } from 'react';

const PostAva = ({ userinfo }) => {
    return (
        <div 
            className='post-ava'
        >
            <div>
                <div className='username'>
                    <span>
                        {userinfo.username}
                    </span>                    
                </div>
                <div className='userinfo'>
                    <span>
                        {userinfo.info}
                    </span>
                </div>
            </div>
            <img/>
        </div>
    )
}

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
                <PostAva userinfo={this.props.userinfo} />
                <div className=''>

                </div>
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
                    <span 
                        onClick={_ => this.props.onLike()}
                    >
                        <i className="fab fa-gratipay"></i>
                    </span>
                    <span>{this.props.value.likes}</span>
                </div>

        </div>);
    }
}