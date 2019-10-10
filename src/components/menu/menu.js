import React, { Component } from 'react';
import './menu.scss';

class Option extends Component {
    render() {
        return <div className='option'>
            <a href={this.props.href}>{this.props.value}</a>
        </div>;
    }
}

class Menu extends Component {
    renderOption(title, link) {
        return <Option value={title} href={link}/>
    }
    
    render() {
        return <div className='menu'>
            {this.renderOption('Home', '/')}
            {this.renderOption('Profile', 'anotherPage')}
        </div>
    }
}

export default Menu;