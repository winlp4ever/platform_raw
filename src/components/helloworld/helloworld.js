import style from './helloworld.scss';
import React, { Component} from "react";

class HelloWorld extends Component{
    render () {
      return(
        <div className='Hello'>
          <h1> Hello, World! </h1>
        </div>
      );
    }
  }
  
  export default HelloWorld;