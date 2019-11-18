import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { Provider, Node } from "@nteract/mathjax";
import RemarkMathPlugin from 'remark-math';
import CodeBlock from '../syntax-highlight/syntax-highlight';

class MdRender extends Component {
    shouldComponentUpdate(newProps) {
        // not update if the content is not changed
        return JSON.stringify(newProps) != JSON.stringify(this.props);
    }
    
    render() {
        const newProps = {
            ...this.props,
            escapeHtml: false, // enable html rendering
            plugins: [
            RemarkMathPlugin,
            ],
            renderers: {
                ...this.props.renderers,
                code: CodeBlock,
                math: (props) =>
                    <Node>{props.value}</Node>, // enable math block rendering
                inlineMath: (props) =>
                    <Node inline>{props.value}</Node>, // enable math inline rendering
            }
        };
        return (
            <Provider>
                <ReactMarkdown {...newProps}/>
            </Provider>
        );
    }
    
};
export default MdRender;