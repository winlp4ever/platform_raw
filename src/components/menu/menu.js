import React, { Component } from 'react';
import './menu.scss';
import {OptionOnClick} from './behavior';
class Option extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
        this.state = {
            isActive: false, 
            defaultClass: 'option',
            class: 'option'
        }
    }

    onClick() {
        if (!this.state.isActive) {
            this.setState({
                class: this.state.class + ' isActive',
                isActive: true
            })
        }
    }

    render() {
        return <button className={this.state.class} onClick={this.onClick}>
            <a>{this.props.value}</a>
        </button>;
    }
}

class Menu extends Component {
    componentDidMount() {
        OptionOnClick();
    }
    renderOption(title) {
        return <Option value={title}/>
    }
    
    render() {
        return <div className='menu'>
            {this.renderOption('Home')}
            {this.renderOption('Posts')}
            {this.renderOption('SomethingElse')}
        </div>
    }
}

export default Menu;