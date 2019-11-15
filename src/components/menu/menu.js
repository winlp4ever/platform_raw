import React, { Component } from 'react';
import './menu.scss';

class Option extends Component {
    render() {
        return <button className={this.props.className} onClick={_ => this.props.onClick()}>
            <a>{this.props.value}</a>
        </button>;
    }
}

class Menu extends Component {
    renderOption(i) {
        let classname = 'option';
        if (i == this.props.active) {
            classname += ' isActive';
        } 
        return <Option 
            key={i} 
            value={this.props.options[i]} 
            className={classname} 
            onClick={_=>this.props.handleClick(i)}
        />
    }
    
    render() {
        let options = [];
        for (let i in this.props.options) options.push(this.renderOption(i));
        return (
            <div className='menu'>
                {options}
            </div>
        );
    }
}

export default Menu;