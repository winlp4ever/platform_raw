import React, { Component } from 'react';
import './menu.scss';

class Option extends Component {
    render() {
        return (
            <div>
                <button className={this.props.className}>
                    <a onClick={_ => this.props.onClick()}>{this.props.name}</a>
                    {this.props.cancel ? (<a onClick={_ => this.props.cancel()}><i className="fas fa-times"></i></a>) : ''}
                </button>
                
                
            </div>
        );
    }
}

class Menu extends Component {
    renderOption(i) {
        let classname = 'option';
        let cancel = null;
        if (this.props.options[i].cancelViewPost) {
            classname += ' cancelable';
            cancel = this.props.options[i].cancelViewPost;
        }
        if (i == this.props.active) {
            classname += ' isActive';
        } 
        return <Option 
            key={i} 
            name={this.props.options[i].name} 
            className={classname} 
            onClick={_=>this.props.handleClick(i)}
            cancel={cancel}
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