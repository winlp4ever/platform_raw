import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu/menu';
import Article from './components/article/article';
import Chat from './components/chat/chat';

import "./_common.scss";


function renderWeb() {
    var content = '<&- content &>'
    ReactDOM.render(<Menu />, document.getElementById('main'));
    ReactDOM.render(<Article content={content} />, document.getElementById('article'));
    ReactDOM.render(<Chat />, document.getElementById('chat'));
}
renderWeb();

if (module.hot) {
    module.hot.accept(['./components/menu/menu', './components/article/article', './components/chat/chat'], () => {
        renderWeb();
    });
    module.hot.accept();
}