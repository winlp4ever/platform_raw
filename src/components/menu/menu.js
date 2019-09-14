import React, { Component } from 'react';
import style from './menu.scss';

class Option extends Component {
    render() {
        return <div className='option'>
            {this.props.value}
        </div>;
    }
}

class Menu extends Component {
    renderOption(msg) {
        return <Option value={msg} />
    }
    
    render() {
        return <div className='menu'>
            {this.renderOption('Home')}
            {this.renderOption('Profile')}
        </div>
    }
}

export default Menu;