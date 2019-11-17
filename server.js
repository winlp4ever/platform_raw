//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const utils = require('./server-utils/utils');

var app = express();
app.use(favicon(path.join(__dirname, 'imgs', 'favicon.ico')));
app.use(express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

var comments = [
    {
        postId: 0,
        comments: [
            'what the hell',
            'hey you'
        ]
    }
]

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
    
    compiler.outputFileSystem.readFile(filename, async (err, data) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(data);
        res.end();
    });
});

app.post('/del-post', (req, res) => {
    console.log(req.body.index);
    if (req.body.password == '2311') {
        posts.posts.splice(parseInt(req.body.index), 1);
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
        let idx = posts.posts.length;
        posts.posts.push({
            index: idx,
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

app.post('/postComment', (req, res) => {
    console.log(req.query.postId);
    res.json({comments: comments[parseInt(req.query.postId)].comments});
})

app.post('/submitComment', (req, res) => {
    console.log(req.query.postId);
    comments[parseInt(req.query.postId)].comments.push(req.body.newComment);
    res.json({answer: 'y'});
})

app.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});