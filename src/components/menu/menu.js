import React, { Component } from 'react';
import './menu.scss';

class Option extends Component {
    render() {
        return <button className='option'>
            <a href={this.props.href}>{this.props.value}</a>
        </button>;
    }
}

class Menu extends Component {
    renderOption(title, link) {
        return <Option value={title} href={link}/>
    }
    
    render() {
        return <div className='menu'>
            {this.renderOption('Home', '/')}
            {this.renderOption('Posts', '/')}
        </div>
    }
}

export default Menu;