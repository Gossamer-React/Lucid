import React, { Component } from 'react';
import Log from './../components/Log/Log.jsx';
import styles from '../../public/log-container.css';

class LogContainer extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      logs: _Logs
    }
  }

  render() {
    console.log("LOGS:", _Logs);
    let logs = this.state.logs.map((log) => {
      console.log(log);
      return  <Log />;
    });

    return (
      <div id="log-container">
        <h1>Log</h1>
        {logs}
      </div>
    )
  }
}

export default LogContainer;
