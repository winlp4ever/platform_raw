import React from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";
import Posts from "./components/post/posts"

import "./_common.scss";

function renderWeb() {
    ReactDOM.render(<Menu />, document.getElementById("main"));
    ReactDOM.render(<Posts />, document.getElementById("posts"));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu', './components/post/post'], () => {
        renderWeb();
    });
    module.hot.accept();
}