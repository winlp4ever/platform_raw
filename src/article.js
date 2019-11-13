import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu/menu';
import Chat from './components/chat/chat';

import "./_common.scss";


function renderWeb() {
    var content = '<&- content &>'
    ReactDOM.render(<Menu />, document.getElementById('main'));
    ReactDOM.render(<Chat />, document.getElementById('chat'));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu', './components/chat/chat'], () => {
        renderWeb();
    });
    module.hot.accept();
}