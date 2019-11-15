import React, { Component } from 'react';
import './menu.scss';
import {OptionOnClick} from './behavior';
class Option extends Component {
    render() {
        return <button className={this.props.className} onClick={_ => this.props.onClick()}>
            <a>{this.props.value}</a>
        </button>;
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: -1,
            options: [['Home', '/to-home'], ['Posts', '/to-posts']]
        }
    }

    handleClick(i) {
        this.setState({active: i});
    }

    renderOption(i) {
        let classname = 'option';
        if (i == this.state.active) classname += ' isActive';
        return <Option 
            key={i} 
            value={this.state.options[i][0]} 
            className={classname} 
            onClick={_=>this.handleClick(i)}
        />
    }
    
    render() {
        let options = [];
        for (let i in this.state.options) options.push(this.renderOption(i));
        return <div className='menu'>
            {options}
        </div>
    }
}

export default Menu;