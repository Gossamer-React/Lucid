import React, { Component } from 'react';
import Log from './../components/Log/Log.jsx';
import styles from '../../public/log-container.css';

const LogContainer = (props) => {
  console.log('LOGS: ', props);
  let logs = props.logs.map((log, i) => {
    return <Log key={i} operationName={log.operationName} query={log.query} variables={log.variables} logId={i} />
  });

  logs.reverse();

  console.log('LOGS', logs);
  return (
    <div id='log-container'>
      <h1>Log</h1>
      <hr id='log-hr' />
      <div id='logs'>
        {logs}
      </div>
    </div>
  )
}

export default LogContainer;
