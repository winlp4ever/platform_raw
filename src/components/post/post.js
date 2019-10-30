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
                <a style={{display: 'none'}} href="https://icons8.com/icon/43740/linking">Linking icon by Icons8</a>
                
                <PostAva userinfo={this.props.userinfo} />
                <div className=''>

                </div>
                <div 
                    dangerouslySetInnerHTML={{
                        __html: `${this.props.value.title}\n${this.props.value.content}`
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