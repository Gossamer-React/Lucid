import React from 'react';
import Log from './../components/Log/Log.jsx';
import styles from '../../public/log-container.css';

const LogContainer = props => {
  // console.log(props);
  let logs = props.logs.map((log, i) => {
    let text = JSON.parse(log.req.postData.text);
    return (
      <Log
        key={i}
        operationName={text.operationName}
        query={text.query}
        variables={text.variables}
        logId={i}
        logChange={props.logChange}
      />
    );
  });

  logs.reverse();
  return (
    <div id='log-container'>
      <div id='log-header'>
        <h2>Requests Log</h2>
        <button data-log='req-log' onClick={(e) => { props.clearLog(e); }}>Clear All</button>
      </div>
      <hr />
      <div id='logs'>{logs}</div>
    </div>
  );
};

export default LogContainer;
