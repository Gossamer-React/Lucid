import React, { Component } from 'react';
import styles from '../../public/log-container.css';

class LogContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="log-container">
        <h1>Log</h1>
      </div>
    )
  }
}

export default LogContainer;
