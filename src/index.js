import React from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";
import Posts from "./components/post/posts";
import Chat from './components/chat/chat';

import "./_common.scss";

function renderWeb() {
    ReactDOM.render(<Menu />, document.getElementById("main"));
    ReactDOM.render(<Posts />, document.getElementById("posts"));
    ReactDOM.render(<Chat />, document.getElementById('chat'));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu', './components/post/posts', './components/chat/chat'], () => {
        renderWeb();
    });
    module.hot.accept();
}