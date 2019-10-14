import React from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";
import MdEditor from "./components/mdEditor/mdEditor";

import "./_common.scss";

function renderWeb() {
    ReactDOM.render(<Menu />, document.getElementById("main"));
    ReactDOM.render(<MdEditor />, document.getElementById("post"));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu'], () => {
        renderWeb();
    });
    module.hot.accept();
}