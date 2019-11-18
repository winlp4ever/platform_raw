import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { Provider, Node } from "@nteract/mathjax";
import RemarkMathPlugin from 'remark-math';

class MdRender extends Component {
    shouldComponentUpdate(newProps) {
        // not update if the content is not changed
        return JSON.stringify(newProps) != JSON.stringify(this.props);
    }
    
    render() {
        const newProps = {
            ...this.props,
            plugins: [
            RemarkMathPlugin,
            ],
            renderers: {
                ...this.props.renderers,
                math: (props) =>
                    <Node>{props.value}</Node>,
                inlineMath: (props) =>
                    <Node inline>{props.value}</Node>,
            }
        };
        return (
            <Provider>
                <ReactMarkdown {...newProps} escapeHtml={false}/>
            </Provider>
        );
    }
    
};
export default MdRender;