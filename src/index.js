import React from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";

import "./_common.scss";

function renderWeb() {
    ReactDOM.render(<Menu />, document.getElementById("main"));
}
renderWeb();

const what = 'what is this thing? oof ';
console.log('hey you');

if (module.hot) {
    module.hot.accept(['./components/menu/menu'], () => {
        renderWeb();
    });
    module.hot.accept();
}