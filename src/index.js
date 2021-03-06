import React, {Component} from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu/menu";
import Posts from "./components/post/posts";
import Chat from './components/chat/chat';
import MdEditor from './components/md-editor/md-editor';
import Article from './components/article/article';
import "./_common.scss";
import Aboutme from "./components/aboutme/aboutme";


class View extends Component {
    render() {
        let clname = `view ${this.props.displayOrNot}`;
        return (
            <section className={clname}>
                {this.props.displayComponent}
            </section>
        )
    }
}


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 1,
            options: [
                [{name: 'About me'}, _ => { return <Aboutme />; }],
                [{name: 'Posts'}, _ => {return <Posts viewPost={this.viewPost}/>}],
                [{name: 'Editor'}, _ => {return <MdEditor />}]
            ]
        };
        this.chooseMenuOption = this.chooseMenuOption.bind(this);
        this.viewPost = this.viewPost.bind(this);
        this.cancelViewPost = this.cancelViewPost.bind(this);
    }

    chooseMenuOption(i) {
        this.setState({isActive: i});
    }

    viewPost(post) {
        let options = this.state.options.slice(0, 3);
        let view = [
            {
                name: post.title, 
                cancelViewPost: this.cancelViewPost
            }, 
            _ => { return <Article postId={post.index} />}
        ];
        options.push(view);
        this.setState({
            isActive: options.length - 1,
            options: options
        })
    }

    cancelViewPost() {
        let options = this.state.options.slice(0, this.state.options.length-1);
        this.setState({
            isActive: 1,
            options: options
        })
    }

    render() {
        let menuOptions = [];
        let views = [];
        for (const [i, opt] of this.state.options.entries()) {
            menuOptions.push(opt[0]);
            let displayOrNot = (this.state.isActive == i) ? ' display': ''
            views.push(<View key={i} displayComponent={opt[1]()} displayOrNot={displayOrNot} />)
        }
        return (
            <div>
                <Menu 
                    options={menuOptions} 
                    active={this.state.isActive} 
                    handleClick={this.chooseMenuOption}
                />
                {views}
            </div>
        )
    }
}

function renderWeb() {
    ReactDOM.render(<Main />, document.getElementById('main'));
    ReactDOM.render(<Chat />, document.getElementById('chat'));
}
renderWeb();

if (module.hot) {
    module.hot.accept(
        [
            './components/menu/menu', 
            './components/post/posts', 
            './components/chat/chat', 
            './components/article/article',
            './components/comment/comment',
            './components/aboutme/aboutme'
        ], () => {
        renderWeb();
    });
    module.hot.accept();
}