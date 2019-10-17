//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

var posts = require('./posts.json');
console.log(posts);

app.use(
    middleware(compiler, options)
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.get('/', (req, res, next) => {
    var filename = path.join(compiler.outputPath,'index');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
});

app.post('/save-post', (req, res, next) => {
    console.log(req.body);
    posts.posts.push({title: req.body.title, content: req.body.content});
    //let p = path.join(path.join(__dirname, 'build'), 'index');
    //res.sendFile(p);
    /*
    var filename = path.join(compiler.outputPath,'index');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
        console.log('OK');
    });
    */
    console.log(posts);
    res.json(posts);
})

app.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});