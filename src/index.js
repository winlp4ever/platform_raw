import React from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";
import MdEditor from "./components/mdEditor/mdEditor";
import Posts from "./components/post/post"

import "./_common.scss";

function renderWeb() {
    ReactDOM.render(<Menu />, document.getElementById("main"));
    ReactDOM.render(<MdEditor />, document.getElementById("post"));
    ReactDOM.render(<Posts />, document.getElementById("posts"));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu', './components/post/post'], () => {
        renderWeb();
    });
    module.hot.accept();
}