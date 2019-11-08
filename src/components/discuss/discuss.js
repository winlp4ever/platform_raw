import React, { Component } from 'react';

class Discuss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newcomment: {
                user: 'me',
                content: ''
            }
        }
    }
}