//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './public');
app.set('view engine','ejs');

const config = require('./webpack.config.js');

const options = {
    contentBase: './public',
    hot: true,
    host: 'localhost'
};

// webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
//const server = new webpackDevServer(compiler, options);

app.use(
    middleware(compiler, options)
);

app.use(require('webpack-hot-middleware')(compiler));
app.get('/', (req, res) => {
    res.render('/index.ejs', {txt: 'an example'});
})

app.get('/posts', (req, res) => {
    fs.readFile('posts.json', (err, data) => {
        if (err) throw err;
        let posts = JSON.parse(data);
        console.log(posts);
        res.send(posts);
    });
    
})

app.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});