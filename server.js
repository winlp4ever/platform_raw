//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const ejs = require('ejs');
const utils = require('./server-utils/utils');

var app = express();
app.use(favicon(path.join(__dirname, 'imgs', 'favicon.ico')));
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
//compiler.outputFileSystem = fs;

var posts = require('./posts.json');
console.log(posts);
var pims = [{
    userid: 'me',
    content: 'holy shit'
}]

app.use(
    middleware(compiler, options)
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.get('/pims', (req, res) => {
    res.send(pims);
})

app.get('/', (req, res, next) => {
    console.log(req.query);
    var filename = path.join(compiler.outputPath,'index');
    
    compiler.outputFileSystem.readFile(filename, async (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        //res.render(filename, {something: 'funny'});
        let html = await ejs.render(result.toString(), {demo: '<h1>oof</h1>'}, {delimiter: '&'});

        res.send(html);
        res.end();
    });
});

app.get('/articles', (req, res, next) => {
    let id = parseInt(req.query.articleid);
    console.log(id);
    var filename = path.join(compiler.outputPath,'article');
    
    compiler.outputFileSystem.readFile(filename, async (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        //res.render(filename, {something: 'funny'});
        let html = await ejs.render(result.toString(), {content: 'wtf'}, {delimiter: '&'});

        res.send(html);
        res.end();
    });
})

app.post('/del-post', (req, res) => {
    if (req.body.password == '2311') {
        posts.posts.splice(parseInt(req.body.index));
        res.json({
            answer: 'y'
        })
    }
    else {
        res.json({
            answer: 'n'
        })
    }
    console.log(posts);
});

app.post('/like-a-post', (req, res) => {
    let idx = req.body.index;
    posts.posts[idx]['likes'] ++;
    res.json({
        answer: 'y'
    });
})

app.post('/save-post', (req, res, next) => {
    if (req.body.title != '' && req.body.content != '' && req.body.password == '2311') {
        posts.posts.push({
            userinfo: {
                imgurl: "",
                username: "me",
                info: "."
            },
            title: req.body.title, 
            content: req.body.content, 
            likes: 0
        });
        console.log(posts);
        res.json({
            answer: 'y',
            posts: posts.posts
        });
    } else {
        res.json({
            answer: 'n'
        })
    }
})

app.post('/new-pim', (req, res) => {
    pims.push({
        userid: req.body.userid,
        content: req.body.content
    })
    console.log(pims);
    res.json(pims);
})

app.post('/update-chat', (req, res) => {
    if (!utils.compare2Arrays(req.body.chat, pims)) {
        res.json({answer: 'y', pims: pims});
    } else {
        res.json({answer: 'n'});
    }
})

app.get('/articles', (req, res) => {
    var filename = path.join(compiler.outputPath,'article');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
})

app.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});