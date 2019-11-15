import React, {Component} from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";
import Posts from "./components/post/posts";
import Chat from './components/chat/chat';

import "./_common.scss";
import Aboutme from "./components/aboutme/aboutme";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 1,
            options: [
                ['About me', _ => { return <Aboutme />; }],
                ['Posts', _ => {return <Posts />}]
            ]
        };
        this.chooseMenuOption = this.chooseMenuOption.bind(this);
    }

    chooseMenuOption(i) {
        this.setState({isActive: i});
    }

    render() {
        let menuOptions = [];
        for (let opt of this.state.options) {
            menuOptions.push(opt[0]);
        }
        return (
            <div>
                <Menu 
                    options={menuOptions} 
                    active={this.state.isActive} 
                    handleClick={this.chooseMenuOption}
                />
                {this.state.options[this.state.isActive][1]()}
            </div>
        )
    }
}

function renderWeb() {
    ReactDOM.render(<Main />, document.getElementById('main'));
    ReactDOM.render(<Chat />, document.getElementById('chat'));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu', './components/post/posts', './components/chat/chat'], () => {
        renderWeb();
    });
    module.hot.accept();
}